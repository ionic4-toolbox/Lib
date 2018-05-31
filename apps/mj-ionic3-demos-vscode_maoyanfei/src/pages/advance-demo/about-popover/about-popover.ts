import { Component } from '@angular/core';

import {IonicPage, App, NavController, ModalController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    template: `
    <ion-list>
      <button ion-item (click)="close('http://ionicframework.com/docs/v2/getting-started')">Ionic入门</button>
      <button ion-item (click)="close('http://ionicframework.com/docs/v2')">文档</button>
      <button ion-item (click)="close('http://showcase.ionicframework.com')">展示</button>
      <button ion-item (click)="close('https://github.com/ionic-team/ionic')">回复GitHub</button>
      <button ion-item (click)="support()">Support</button>
    </ion-list>
  `
})
export class PopoverPage {

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public app: App,
        public modalCtrl: ModalController
    ) { }

    /**
     * 弹出个人信息页
     */
    support() {
        this.app.getRootNav().push('SupportPage');
        this.viewCtrl.dismiss();
    }

    /**
     * 关闭窗口
     * @param url 要关闭的窗口
     */
    close(url: string) {
        window.open(url, '_blank');
        this.viewCtrl.dismiss();
    }
}