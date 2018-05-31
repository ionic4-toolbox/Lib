import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-button-components',
  templateUrl: 'button-components.html',
})
export class ButtonComponentsPage {


  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  doAlert(btnObj) {
    let alert = this.alertCtrl.create({
      title: 'Message!',
      message: btnObj + " Button Clicked.",
      buttons: ['Ok']
    });

    alert.present();
  }
}
