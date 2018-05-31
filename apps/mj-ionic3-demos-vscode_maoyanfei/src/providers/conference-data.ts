import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserData } from './user-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ConferenceData {
    /**
    * 会议数据
    */
    data: any;

    constructor(public http: Http, public user: UserData) { }

    /**
     * 加载会议数据
     */
    load(): any {
        if (this.data) {
            return Observable.of(this.data);
        } else {
            return this.http.get('assets/data/data.json')
                .map(this.processData, this);
        }
    }

    /**
     * 处理会议数据
     * @param data 会议数据
     */
    processData(data: any) {
        // 一旦数组对象就绪，就通过链接的分会场（sessions）创建data
        this.data = data.json();

        this.data.tracks = [];

        // 查看每天的日程安排
        this.data.schedule.forEach((day: any) => {
            // 查看当天各分会场的时间分组
            day.groups.forEach((group: any) => {
                // 通过时间分组（timeline group）查看每个分会场（session）
                group.sessions.forEach((session: any) => {
                    session.speakers = [];  //演讲人
                    if (session.speakerNames) {
                        session.speakerNames.forEach((speakerName: any) => {
                            let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
                            if (speaker) {
                                session.speakers.push(speaker);
                                speaker.sessions = speaker.sessions || [];
                                speaker.sessions.push(session);
                            }
                        });
                    }

                    if (session.tracks) {
                        session.tracks.forEach((track: any) => {
                            if (this.data.tracks.indexOf(track) < 0) {
                                this.data.tracks.push(track);
                            }
                        });
                    }
                });
            });
        });
        return this.data;
    }

    /**
     * 获取时间分组
     * @param dayIndex 日期索引
     * @param queryText 查询词
     * @param excludeTracks 不包含的跟踪
     * @param segment 分段信息
     */
    getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
        return this.load().map((data: any) => {
            let day = data.schedule[dayIndex];
            day.shownSessions = 0;

            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

            day.groups.forEach((group: any) => {
                group.hide = true;

                group.sessions.forEach((session: any) => {
                    // 检查是否应该显示该分会场
                    this.filterSession(session, queryWords, excludeTracks, segment);

                    if (!session.hide) {
                        // if this session is not hidden then this group should show
                        group.hide = false;
                        day.shownSessions++;
                    }
                });

            });
            return day;
        });
    }

    /**
     * 搜索分会场
     * @param session 分会场
     * @param queryWords 查询的关键词
     * @param excludeTracks 不包含的跟踪信息
     * @param segment 页中的分段信息
     */
    filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

        let matchesQueryText = false;
        if (queryWords.length) {
            // 对每个分会场的搜索词都传递查询测试
            queryWords.forEach((queryWord: string) => {
                if (session.name.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        } else {
            // 如果没有搜索词，就传递查询测试
            matchesQueryText = true;
        }

        // 如果分会场的跟踪信息未包含当前的跟踪信息，就传递查询测试
        let matchesTracks = false;
        session.tracks.forEach((trackName: string) => {
            if (excludeTracks.indexOf(trackName) === -1) {
                matchesTracks = true;
            }
        });

        // 如果分段信息是'favorites'，但该分会场并不是该用户喜欢的，则不传递该分段
        let matchesSegment = false;
        if (segment === 'favorites') {
            if (this.user.hasFavorite(session.name)) {
                matchesSegment = true;
            }
        } else {
            matchesSegment = true;
        }

        // 对于所有测试，只要不是隐藏的，都必须为true
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
    }

    /**
     * 获取演讲人
     */
    getSpeakers() {
        return this.load().map((data: any) => {
            return data.speakers.sort((a: any, b: any) => {
                let aName = a.name.split(' ').pop();
                let bName = b.name.split(' ').pop();
                return aName.localeCompare(bName);
            });
        });
    }

    /**
     * 获取跟踪信息
     */
    getTracks() {
        return this.load().map((data: any) => {
            return data.tracks.sort();
        });
    }

    /**
     * 获取匹配信息
     */
    getMap() {
        return this.load().map((data: any) => {
            return data.map;
        });
    }

}
