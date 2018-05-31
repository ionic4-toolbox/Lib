import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-select-box',
  templateUrl: 'select-box.html'
})

export class SelectBoxPage {
  gender: string = "f";
  gaming: string = "n64";
  notifications: string = "mute";
  os: string = "linux";
  music: string = "Nirvana";
  month: string = "12";
  year: number = 1991;
  toppings: any;

  musicAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController) {
    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };
  }

  notificationSelect(event) {
    console.log(event);
  }

  selectOption() {
    console.log('Selected Music : ' + this.music);
  }

  selectMultiple(event) {
    console.log(event);

    if (event != null && event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        console.log("Select [" + i +"] = " + event[i]);
      }
    }
  }

}
