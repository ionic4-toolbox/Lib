import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chip',
  templateUrl: 'chip.html',
})
export class ChipPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  delete(chip: Element) {
    chip.remove();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ChipPage');
  // }

}
