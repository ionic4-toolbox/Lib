import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-navigation-details',
  templateUrl: 'navigation-details.html',
})
export class NavigationDetailsPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data.item;
  }
}
