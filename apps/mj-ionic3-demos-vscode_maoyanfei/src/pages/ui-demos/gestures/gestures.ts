import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gestures',
  templateUrl: 'gestures.html',
})
export class GesturesPage {
  public press: number = 0;
  public pan: number = 0;
  public swipe: number = 0;
  public tap: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  pressEvent(e:Event) {
    this.press++;
    console.log(e.returnValue);
  }
  panEvent(e: Event) {
    this.pan++
    console.log(e.returnValue);
  }
  swipeEvent(e: Event) {
    this.swipe++
    console.log(e.returnValue);
  }
  tapEvent(e: Event) {
    this.tap++
    console.log(e.returnValue);
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad GesturesPage');
  // }

}
