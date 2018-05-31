import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-segments',
  templateUrl: 'segments.html',
})
export class SegmentsPage {
  pet: string = "puppies";
  isAndroid: boolean = false;
  constructor(
    platform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    this.isAndroid = platform.is('android');
  }
}
