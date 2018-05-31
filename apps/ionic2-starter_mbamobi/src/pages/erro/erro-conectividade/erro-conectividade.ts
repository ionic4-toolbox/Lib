import { Component } from '@angular/core';
import { Http } from '@mbamobi/http';
import { Events, IonicPage, Platform, ToastController, ViewController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';

@IonicPage({
  name: 'erro-conectividade'
})
@Component({
  selector: 'page-erro-conectividade',
  templateUrl: 'erro-conectividade.html'
})

export class ErroConectividadePage {

  isIos: boolean;

  constructor(
    private diagnostic: Diagnostic,
    private events: Events,
    private network: Network,
    private http: Http,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    platform: Platform
  ) {
    this.isIos = platform.is('ios');
  }

  retry() {
    if (this.network.type === 'none') {
      const toast = this.toastCtrl.create({
        message: 'Verifique a conexão!!!',
        duration: 3000,
        position: 'top'
      });

      toast.present();

      return;
    }

    this.viewCtrl.dismiss(null, null, {
      animate: false
    });
    if (this.http.canRetry()) {
      this.http.retryRequest().subscribe((res) => {
        this.events.publish('connection.retry', res, this.http.getLastRequest());
      });
    }
  }

  settings() {
    this.diagnostic.switchToWifiSettings();
  }
}
