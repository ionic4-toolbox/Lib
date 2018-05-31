import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, platform: Platform, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      splashScreen.hide();
    });
  }

}
