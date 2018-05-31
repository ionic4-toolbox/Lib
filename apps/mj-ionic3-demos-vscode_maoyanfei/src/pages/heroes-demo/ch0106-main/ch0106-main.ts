import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ch0106-main',
  templateUrl: 'ch0106-main.html',
})
export class Ch0106MainPage {
  title = 'Tour of Heroes';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Ch0106MainPage');
  // }

}
