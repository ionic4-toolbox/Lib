import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';

@Injectable()
export class GithubUsersProvider {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: HttpClient) {}

  load(): Observable<any> {
  	//const result = this.http.get(`${this.githubApiUrl}/users`).map(res => <User[]>res.json());
  	return this.http.get(`${this.githubApiUrl}/users`);
  }

  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`);
  }

  searchUsers(searchParam: string): Observable<User[]> {
  	console.log('searchParam', searchParam);
    return this.http.get("${this.githubApiUrl}/search/users?q=${searchParam}");
  }
}
