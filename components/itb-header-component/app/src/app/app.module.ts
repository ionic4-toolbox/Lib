import { NgModule, ErrorHandler }		from '@angular/core';
import { BrowserModule }				from '@angular/platform-browser';
import { IonicApp }						from 'ionic-angular';
import { IonicModule }					from 'ionic-angular';
import { IonicErrorHandler }			from 'ionic-angular';

import { StatusBar }					from '@ionic-native/status-bar';
import { SplashScreen }					from '@ionic-native/splash-screen';

import { MainApp }						from './app.component';

import { ComponentsModule }				from '../components/components.module';

import { AboutPage }					from '../pages/about/about';
import { ContactPage }					from '../pages/contact/contact';
import { HomePage }						from '../pages/home/home';
import { TabsPage }						from '../pages/tabs/tabs';


@NgModule({
	declarations: [
		MainApp,
		AboutPage, ContactPage, HomePage, TabsPage
	],
	imports: [
		BrowserModule,
		ComponentsModule,
		IonicModule.forRoot(MainApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MainApp,
		AboutPage, ContactPage, HomePage, TabsPage
	],
	providers: [
		StatusBar, SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
