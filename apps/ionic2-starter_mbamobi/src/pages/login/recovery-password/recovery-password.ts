import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController,  } from 'ionic-angular';

@IonicPage({
  name: 'login-recoveryPassword'
})
@Component({
  selector: 'page-recovery-password',
  templateUrl: 'recovery-password.html'
})
export class RecoveryPasswordPage {
  constructor(private toastCtrl: ToastController, private navCtrl: NavController) {}

  /**
   * Função para recuperação de senha do usuário.
   */
  recoveryPassoword() {

    const toast = this.toastCtrl.create({
      message: 'E-mail enviado com sucesso!',
      duration: 3000,
      position: 'top'
    });

    toast.present();
    this.navCtrl.pop();
  }
}
