import {ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {GoogleAuthService} from "./GoogleAuthService";
import {GoogleApiService} from "./GoogleApiService";
import {GoogleMailService} from "./GoogleMailService";
import {GoogleClientService} from "./GoogleClientService";


@NgModule()
export class GoogleApiModule {
    static forRoot(gapiConfigProvider: Provider): ModuleWithProviders {
        return {
            ngModule: GoogleApiModule,
            providers: [
                gapiConfigProvider,
                GoogleAuthService,
                GoogleApiService,
                GoogleMailService,
                GoogleClientService
            ]
        }
    }
}
