import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, IonicPage, NavController, NavParams } from 'ionic-angular';

//mj：与源码不一致，待进一步修改。

@IonicPage()
@Component({
  selector: 'page-popovers',
  templateUrl: 'popovers.html',
})
export class PopoversPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(
    private popoverCtrl: PopoverController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  presentPopover(ev:any) {

    let popover = this.popoverCtrl.create('PopoverPage', {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

}
