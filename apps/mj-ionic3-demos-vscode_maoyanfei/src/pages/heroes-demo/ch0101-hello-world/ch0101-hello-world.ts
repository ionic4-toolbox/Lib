import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ch0101-hello-world',
  templateUrl: 'ch0101-hello-world.html',
})
export class Ch0101HelloWorldPage {
  title = "这是我的第1个 Ionic 3 App"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ch0101HelloWorldPage');
  }

}
