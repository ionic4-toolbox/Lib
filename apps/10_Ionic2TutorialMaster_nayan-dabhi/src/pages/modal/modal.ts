import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})

export class ModalPage {
  public items = [{
    name: 'Gollum',
    quote: 'Sneaky little hobbitses!',
    image: 'assets/img/bjork-live.jpg',
    items: [
      { title: 'Race', note: 'Hobbit' },
      { title: 'Culture', note: 'River Folk' },
      { title: 'Alter Ego', note: 'Smeagol' }
    ]
  }, {
    name: 'Frodo',
    quote: 'Go back, Sam! I\'m going to Mordor alone!',
    image: 'assets/img/bjork-live.jpg',
    items: [
      { title: 'Race', note: 'Hobbit' },
      { title: 'Culture', note: 'Shire Folk' },
      { title: 'Weapon', note: 'Sting' }
    ]
  }, {
    name: 'Samwise Gamgee',
    quote: 'What we need is a few good taters.',
    image: 'assets/img/bjork-live.jpg',
    items: [
      { title: 'Race', note: 'Hobbit' },
      { title: 'Culture', note: 'Shire Folk' },
      { title: 'Nickname', note: 'Sam' }
    ]
  }];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) {

  }

  openModal(item) {
    let modal = this.modalCtrl.create(ModalContentPage, { 'character': item });
    modal.present();
  }
}

@Component({templateUrl: './modal-content.html'})

export class ModalContentPage {
  public character: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
      this.character = this.params.get('character');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
