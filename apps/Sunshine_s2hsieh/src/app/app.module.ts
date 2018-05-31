import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ThreeDays } from '../pages/three-days/three-days';
import { TenDays } from '../pages/ten-days/ten-days';
import { Current } from '../pages/current/current';
import { TabsPage } from '../pages/tabs/tabs';
import { ByHourPage } from './../pages/by-hour/by-hour';

import { DataService } from './../services/data';
import { PreferencesService } from '../services/preferences';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation'
import { NativeStorage } from '@ionic-native/native-storage'

import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from './../components/components.module';

@NgModule({
	declarations: [
		MyApp,
		ThreeDays,
		TenDays,
		Current,
		TabsPage,
		ByHourPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		JsonpModule,
		PipesModule,
		ComponentsModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ThreeDays,
		TenDays,
		Current,
		TabsPage,
		ByHourPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Geolocation,
		NativeStorage,
		DataService,
		PreferencesService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
