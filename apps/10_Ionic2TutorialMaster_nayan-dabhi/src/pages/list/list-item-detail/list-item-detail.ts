import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list-item-detail',
  templateUrl: 'list-item-detail.html'
})
export class ListItemDetailPage {
  public person: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.person = navParams.get("person");
    console.log(this.person);
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
