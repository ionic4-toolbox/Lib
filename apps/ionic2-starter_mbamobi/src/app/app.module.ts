import { Providers, ProvidersNative } from '../providers';
import { MyApp } from './app.component';
import { AppConfig } from './app.config';
import { Env, ProviderEnv } from './app.env';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { AuthenticationHttpModule } from '@mbamobi/authentication';
import { ConfigurationModule } from '@mbamobi/configuration';
import { DefaultPlugins, HttpModule, ThrowExceptionStatusToken } from '@mbamobi/http';
import { HttpPluginsIonicModule } from '@mbamobi/http-plugins-ionic';
import { UrlResolverModule } from '@mbamobi/url-resolver';
import { IonicApp, IonicModule } from 'ionic-angular';

// extração mensagem de erro do serviço
export function extraMessageError() {}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, AppConfig),
    IonicStorageModule.forRoot(),
    ConfigurationModule.initialize(AppConfig, Env),
    UrlResolverModule.initialize(),
    HttpModule.initialize(DefaultPlugins),
    HttpPluginsIonicModule,
    AuthenticationHttpModule.initialize(),
  ],
  providers: [
    Providers,
    { provide: ThrowExceptionStatusToken, useValue: extraMessageError },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ProviderEnv,
    ProvidersNative
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ]
})
export class AppModule {
}
