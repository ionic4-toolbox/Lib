import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-toast',
  templateUrl: 'toast.html',
})
export class ToastPage {

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Mmmm, buttered toast',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: '文件已成功保存',
      showCloseButton: true,
      closeButtonText: '确定'
    });
    toast.present();
  }

  showLongToast() {
    let toast = this.toastCtrl.create({
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
      duration: 2000,
    });
    toast.present();
  }

}
