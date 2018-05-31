/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";

@Injectable()
export class GoogleClientService {
    private GoogleClient: any = undefined;

    constructor(private googleApi: GoogleApiService) {
    }

    public getClient(): Observable<any> {
        if (!this.GoogleClient) {
            return this.googleApi.onLoad().mergeMap(() => this.loadGapiClient());
        }
        return Observable.of(this.GoogleClient);
    }

    private loadGapiClient(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            gapi.load('client', () => {
                let client = gapi.client.init(this.googleApi.getConfig().getClientConfig());
                this.GoogleClient = client;
                observer.next(client);
                observer.complete();
                console.info("gapi.client")
            });
        });
    }
}
