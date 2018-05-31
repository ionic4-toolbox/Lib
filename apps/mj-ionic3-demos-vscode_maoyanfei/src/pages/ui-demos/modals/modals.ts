import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage {

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  openModal(characterNum:number) {
    let modal = this.modalCtrl.create('ModalContentPage', characterNum);
    modal.present();
  }

}
