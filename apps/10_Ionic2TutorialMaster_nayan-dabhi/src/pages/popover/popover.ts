import { Component } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})

export class PopoverPage {

  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContentPage);

    popover.present({
      ev: myEvent
    });
  }
}

@Component({ templateUrl: 'popover-content.html'})

export class PopoverContentPage {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
