//https://stackoverflow.com/questions/40214211/disable-angular2-in-memory-web-api-for-production
import { NgModule, Injector } from '@angular/core';
import { HttpModule, XHRBackend, BrowserXhr,
         ResponseOptions,  XSRFStrategy } from '@angular/http';

import { HttpBackendService, InMemoryDbService } from 'angular-in-memory-web-api';//InMemoryBackendService
import { environment } from '../../../environments/environment'


import { EnvironmentData }  from '../environment.data';

export function customHttpFactory(injector: Injector, browser: BrowserXhr,
  xsrf: XSRFStrategy, options: ResponseOptions): any{
    // if (environment.production) {
      return new XHRBackend(browser, options, xsrf);
    // } else {
    //   return new HttpBackendService(injector, new EnvironmentData(), {
    //   });
    // }
};

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {
      provide: XHRBackend,
      useFactory: customHttpFactory,
      deps: [ Injector, BrowserXhr, XSRFStrategy, ResponseOptions ]
    }
  ]
})
export class EnvironmentHttpModule {
}