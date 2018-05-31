import {Observable} from "rxjs";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {GoogleApiConfig, NgGapiClientConfig} from "./config/GoogleApiConfig";
import {Observer} from "rxjs/Observer";

export let NG_GAPI_CONFIG: InjectionToken<NgGapiClientConfig> =
    new InjectionToken<NgGapiClientConfig>("ng-gapi.config");

@Injectable()
export class GoogleApiService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/api:platform.js';
    private config: GoogleApiConfig;
    private gapi:any;
    constructor(@Inject(NG_GAPI_CONFIG) config: NgGapiClientConfig) {
        this.config = new GoogleApiConfig(config);
    }

    public onLoad(): Observable<void> {
        if(!this.gapi) return this.loadGapi();
        return Observable.of(this.gapi);
    }

    public getConfig(): GoogleApiConfig {
        return this.config;
    }

    private loadGapi(): Observable<void> {
        return Observable.create((observer: Observer<boolean>) => {
            let node = document.createElement('script');
            node.src = this.gapiUrl;
            node.type = 'text/javascript';
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.onload = (gapi) => {
                observer.next(true);
                observer.complete();
                console.info(JSON.stringify(gapi));
                console.info("gapi")
            };
            
        });
    }
}
