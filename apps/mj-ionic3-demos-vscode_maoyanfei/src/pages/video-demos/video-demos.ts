import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

//import { RTCMultiConnection } from '../../providers/RTCMultiConnection'

//declare var getMediaElement: any;

@IonicPage()
@Component({
  selector: 'page-video-demos',
  templateUrl: 'video-demos.html',
})
export class VideoDemosPage {
  title: string;
  videoInfo: string;
  isBtnLeaveRoomDisabled = true;
  isBtnOpenRoomDisabled = false;
  isBtnJoinRoomDisabled = false;
  roomId: string="abcdef";
  videosContainer: HTMLElement;
 
  constructor(
    //public connection:RTCMultiConnection,
    private platform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is("android")) { this.title = "(android)"; }
    else if (this.platform.is("ios")) { this.title = "(ios)"; }
    else if (this.platform.is("windows")) { this.title = "(windows)"; }
  }

  // parses the query string
  parseQueryString(queryString: string): Map<string, string> {
    // if the query string is NULL
    if (queryString == null) {
      queryString = window.location.search.substring(1);
    }

    let params = new Map < string, string>();

    let queries = queryString.split("&");

    queries.forEach((indexQuery: string) => {
      let indexPair = indexQuery.split("=");

      let queryKey = decodeURIComponent(indexPair[0]);
      let queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");

      params.set(queryKey, queryValue);
    });

    return params;
  }

  viewDidLoad() {
    let params: URLSearchParams = new URLSearchParams();
    let r = /([^&=]+)=?([^&]*)/g;

    let match, search = window.location.search;
    while (match = r.exec(search.substring(1))) {
      let key = decodeURIComponent(match[1].replace(/\+/g, ' '));
      let val = decodeURIComponent(match[2].replace(/\+/g, ' '));
      params.set(key,val);
    }
    //window.URLSearchParams.arguments = params;
    //self.URLSearchParams.arguments = params;

    let roomid = '';
    // if (localStorage.getItem(this.connection.socketMessageEvent)) {
    //   roomid = <string>localStorage.getItem(this.connection.socketMessageEvent);
    // } else {
    //   roomid = this.connection.token();
    // }
    this.roomId=roomid;
    // this.roomId.onkeyup = () => {
      //  localStorage.setItem(this.connection.socketMessageEvent, roomid);
    // };

    let hashString = location.hash.replace('#', '');
    if (hashString.length && hashString.indexOf('comment-') == 0) {
      hashString = '';
    }

    //roomid = params.roomid;
    if (!roomid && hashString.length) {
      roomid = hashString;
    }

    this.InitRTCMultiConnection();  
    
    // auto-join-room
    //this.reCheckRoomPresence(roomid);

//     if (roomid && roomid.length) {
//       this.roomId=roomid;
// //      localStorage.setItem(this.connection.socketMessageEvent, roomid);
//       this.disableInputButtons();
//     }

    // to make it one-to-one
    // this.connection.maxParticipantsAllowed = 1;
    // this.connection.onRoomFull = () => {
    //   this.connection.closeSocket();
    //   this.connection.attachStreams.forEach((stream: any) => {
    //     stream.stop();
    //   });
      //alert('Room is full.');
    //};
  }

  InitRTCMultiConnection() {
//    this.videosContainer = document.getElementById('videos-container') as HTMLElement;

    //this.connection = new RTCMultiConnection();

    // 使用本项目自带的socket.io服务
    //connection.socketURL = '/';
    // 如果自带的socket-io服务不成功，可暂时先用下面的socket-io服务器来观察运行情况
//    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    //this.connection.socketMessageEvent = 'video-conference-demo';

//    this.connection.session = {
    //   audio: true,
    //   video: true,
    //   data: false
    // };

    // this.connection.sdpConstraints.mandatory = {
    //   OfferToReceiveAudio: true,
    //   OfferToReceiveVideo: true
    // };

    // this.connection.videosContainer = this.videosContainer;
    // this.connection.onstream = (event: any) => {
    //   let width = this.videosContainer.clientWidth / 2 - 20;
    //   let mediaElement = getMediaElement(event.mediaElement, {
    //     title: event.userid,
    //     buttons: ['full-screen'],
    //     width: width,
    //     showOnMouseEnter: false
    //   });

    //   this.connection.videosContainer.appendChild(mediaElement);

    //   setTimeout(function () {
    //     mediaElement.media.play();
    //   }, 5000);

    //   mediaElement.id = event.streamid;
    // };

    // this.connection.onstreamended = (event: any) => {
    //   let mediaElement = document.getElementById(event.streamid) as HTMLElement;
    //   if (mediaElement !== null) {
    //     (mediaElement.parentNode as Node).removeChild(mediaElement);
    //   }
    // };

    // this.connection.onopen = () => {
    //   //this.btnLeaveRoom.setAttribute('disabled', 'false');
    //   this.videoInfo = '你已连接到房间：' + this.connection.getAllParticipants().join(', ');
    // };

    // this.connection.onclose = () => {
    //   if (this.connection.getAllParticipants().length) {
    //     this.videoInfo = '你仍连接在该房间：' + this.connection.getAllParticipants().join(', ');
    //   }
    //   else {
    //     this.videoInfo = '该房间session已关闭或所有成员都已离开。';
    //   }
    // };

    // this.connection.onEntireSessionClosed = (event: any) => {
    //   //this.btnLeaveRoom.setAttribute('disabled', 'true');
    //   //this.btnOpenRoom.setAttribute('disabled', 'false');
    //   //this.btnJoinRoom.setAttribute('disabled', 'false');
    //   this.isBtnLeaveRoomDisabled = true;
    //   this.isBtnOpenRoomDisabled = false;
    //   this.isBtnJoinRoomDisabled = false;

    //   this.connection.attachStreams.forEach((stream: any) => {
    //     stream.stop();
    //   });

    //   // don't display alert for moderator
    //   if (this.connection.userid === event.userid) return;
    //   //Entire session has been closed by the moderator:
    //   this.videoInfo = '所有session均已被关闭：' + event.userid;
    // };

  //   this.connection.onUserIdAlreadyTaken = (useridAlreadyTaken: string, yourNewUserId: string) => {
  //     // seems room is already opened
  //     this.connection.join(useridAlreadyTaken);
  //     this.videoInfo = '你已连接到房间：' + yourNewUserId;
  //   };
  }

  // InitUI() {
  //   //this.btnLeaveRoom = document.getElementById('btn-leave-room') as HTMLElement;
  //   //this.btnOpenRoom = document.getElementById('btn-open-room') as HTMLElement;
  //   //this.btnJoinRoom = document.getElementById('btn-join-room') as HTMLElement;
  //   //this.roomId = document.getElementById('room-id') as HTMLElement;
  //   //this.videosContainer = document.getElementById('videos-container') as HTMLElement;

  //   //this.btnLeaveRoom = <HTMLElement>document.querySelector('#btnLeaveRoom');
  //   //this.btnOpenRoom = <HTMLElement>document.querySelector('#btnOpenRoom');
  //   //this.btnJoinRoom = <HTMLElement>document.querySelector('btnJoinRoom');
  //   //this.roomId = <HTMLElement>document.querySelector('roomId');
  //   //this.videosContainer = <HTMLElement>document.querySelector('#videosContainer');
  // }

  btnOpenRoom_onclick(){
    // this.disableInputButtons();
    // this.connection.open(this.roomId, ()=> {
    //   this.showRoomURL(this.connection.sessionid);
    // });
  }

  btnJoinRoom_onclick(){
    this.disableInputButtons();
    //this.connection.join(this.roomId);
  }

  btnLeaveRoom_onclick(){
    //this.disabled = true;
    // if (this.connection.isInitiator) {
    //   // use this method if you did NOT set "autoCloseEntireSession===true"
    //   // for more info: https://github.com/muaz-khan/RTCMultiConnection#closeentiresession
    //   this.connection.closeEntireSession(() => {
    //     this.videoInfo = '所有session都已关闭。';
    //   });
    // }
    // else {
    //   this.connection.leave();
    // }
  }

  disableInputButtons() {
    //this.btnLeaveRoom.setAttribute('disabled', 'true');
    //this.btnOpenRoom.setAttribute('disabled', 'true');
    //this.btnJoinRoom.setAttribute('disabled', 'true');
    this.isBtnOpenRoomDisabled = true;
    this.isBtnJoinRoomDisabled = true;
    this.isBtnLeaveRoomDisabled = true;

  }


  // ......................................................
  // ......................Handling Room-ID................
  // ......................................................

  showRoomURL(roomid:string) {
    let roomHashURL = '#' + roomid;
    let roomQueryStringURL = '?roomid=' + roomid;

    //Unique URL for your room:
    let html = '<h2>你的房间：</h2><br>';

    html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
    html += '<br>';
    html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

    let roomURLsDiv = document.getElementById('room-urls') as HTMLElement;
    roomURLsDiv.innerHTML = html;

    roomURLsDiv.style.display = 'block';
  }

//  reCheckRoomPresence(roomid:string) {
    // this.connection.checkPresence(roomid, (isRoomExists: boolean)=> {
    //   if (isRoomExists) {
    //     this.connection.join(roomid);
    //     return;
    //   }
    //   setTimeout(this, 5000);
    // });
//  }

}
