import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Platform, ActionSheetController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-action-sheets',
  templateUrl: 'action-sheets.html',
})
export class ActionSheetsPage {

  constructor(
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '相册（Albums）',
      //cssClass: 'page-action-sheets',
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('你点击了删除');
          }
        },
        {
          text: '共享（Share）',
          icon: 'share', //或者：this.platform.is('android') ? 'share' : undefined,
          handler: () => { console.log('你点击了共享'); }
        },
        {
          text: '播放（Play）',
          icon:'arrow-dropright-circle',//或者：this.platform.is('ios') ? 'arrow-dropright-circle' : undefined,
          handler: () => { console.log('你点击了播放'); }
        },
        {
          text: '喜爱（Favorite）',
          icon: 'heart-outline',
          handler: () => { console.log('你点击了喜爱'); }
        },
        {
          text: '取消（Cancel）',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => { console.log('你点击了取消'); }
        }
      ]
    });
    actionSheet.present();
  }

}
