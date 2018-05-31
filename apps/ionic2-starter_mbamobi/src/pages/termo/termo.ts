import { Home } from '../index';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App, IonicPage, NavParams } from 'ionic-angular';

export const KeyStorageTermo = '_termo';

@IonicPage({
  name: 'termo'
})
@Component({
  selector: 'page-termo',
  templateUrl: 'termo.html'
})
export class TermoPage {
  hiddenButton: boolean = false;

  constructor(
    private app: App,
    private storage: Storage,
    navParams: NavParams) {

    if (navParams.get('internal') === true) {
      this.hiddenButton = true;
    }
  }

  ngAfterViewInit() {

    this.storage.get(KeyStorageTermo).then((data) => {
      if (data === true) {
        this.hiddenButton = true;
      }
    });
  }

  accept() {
    this.storage.set(KeyStorageTermo, true);
    this.app.getActiveNav().setRoot(Home);
  }
}
