import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import sqlite storage
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/page';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = HomePage;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}

