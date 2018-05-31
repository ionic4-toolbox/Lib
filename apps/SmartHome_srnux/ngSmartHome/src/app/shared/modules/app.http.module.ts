// //https://stackoverflow.com/questions/40214211/disable-angular2-in-memory-web-api-for-production
// import { NgModule, Injector } from '@angular/core';
// import { HttpModule, XHRBackend, BrowserXhr,
//          ResponseOptions,  XSRFStrategy } from '@angular/http';

// import { InMemoryBackendService, InMemoryDbService } from 'angular-in-memory-web-api';

// let environment = {
//   production: true
// };

// export class MockData implements InMemoryDbService {
//   createDb() {
//     let cats = [
//       { id: 1, name: 'Fluffy' }
//     ];
//     return { cats };
//   }
// }

// @NgModule({
//   imports: [ HttpModule ],
//   providers: [
//     {
//       provide: XHRBackend,
//       useFactory: (injector: Injector, browser: BrowserXhr,
//                    xsrf: XSRFStrategy, options: ResponseOptions): any => {
//         if (environment.production) {
//           return new XHRBackend(browser, options, xsrf);
//         } else {
//           return new InMemoryBackendService(injector, new MockData(), {
//             // the configuration object
//           });
//         }
//       },
//       deps: [ Injector, BrowserXhr, XSRFStrategy, ResponseOptions ]
//     }
//   ]
// })
// export class AppHttpModule {
// }