import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    conferenceDate = '2047年5月17日';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ ev: event });
  }
}
