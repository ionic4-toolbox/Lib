/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";
import GoogleAuth = gapi.auth2.GoogleAuth;
import GoogleUser = gapi.auth2.GoogleAuth;

@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;
    private SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;

    constructor(private googleApi: GoogleApiService) {
    }

    public getAuth(): Observable<GoogleAuth> {
        if (!this.GoogleAuth) {
            return this.googleApi.onLoad().mergeMap(() => this.loadGapiAuth());
        }
        return Observable.of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        return Observable.create((observer: Observer<GoogleAuth>) => {
            gapi.load('auth2', () => {
                let auth = gapi.auth2.init(this.googleApi.getConfig().getClientConfig()).then((authParam)=>{
                    this.GoogleAuth = authParam;
                    observer.next(authParam);
                    observer.complete();
                    console.info("gapi.auth2");
                },(error)=>{console.error(error)});
                
            });
        });
    }
}
