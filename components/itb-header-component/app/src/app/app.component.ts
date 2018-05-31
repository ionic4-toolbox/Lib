import { Component, ViewChild }			from '@angular/core';
import { Platform, Nav }				from 'ionic-angular';
import { StatusBar }					from '@ionic-native/status-bar';
import { SplashScreen }					from '@ionic-native/splash-screen';

import { TabsPage }						from '../pages/tabs/tabs';

import { HomePage }						from './../pages/home/home';
import { AboutPage }					from './../pages/about/about';
import { ContactPage }					from './../pages/contact/contact';

@Component({
	templateUrl: 'app.html'
})
export class MainApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = TabsPage;

	pages: Array<{ title: string, component: any }>;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen
	) {
		this.initializeApp();

		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'About', component: AboutPage },
			{ title: 'Contacs', component: ContactPage }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		this.nav.setRoot(page.component);
	}
}
