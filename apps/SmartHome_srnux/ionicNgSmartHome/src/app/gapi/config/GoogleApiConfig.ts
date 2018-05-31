/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../node_modules/@types/gapi.auth2/index.d.ts" />
import ClientConfig = gapi.auth2.ClientConfig;

export interface NgGapiClientConfig extends ClientConfig {
    discoveryDocs: string[];
}

export class GoogleApiConfig {
    protected clientConfig: NgGapiClientConfig;

    constructor(clientConfig: NgGapiClientConfig) {
        this.clientConfig = clientConfig
    }

    public getClientConfig(): NgGapiClientConfig {
        return this.clientConfig;
    }
}
