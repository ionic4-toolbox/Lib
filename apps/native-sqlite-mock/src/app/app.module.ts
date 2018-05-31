import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite, SQLiteDatabaseConfig }	from '@ionic-native/sqlite';

import { MockSQLite }					from '../providers/mock-sqlite/mock-sqlite';

import { MyApp }						from './app.component';
import { HomePage }						from '../pages/home/home';

@NgModule({
	declarations: [
		MyApp,
		HomePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: SQLite, useClass: MockSQLite },
	]
})
export class AppModule { }

