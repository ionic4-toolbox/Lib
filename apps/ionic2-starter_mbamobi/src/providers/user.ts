import { Injectable } from '@angular/core';
import { Adapter, Authentication } from '@mbamobi/authentication';
import { AlertController, Events } from 'ionic-angular';

export const UserEvents = {
  LOGIN_SUCCESS: 'user.login.success',
  LOGIN_FAILURE: 'user.login.failure',
  LOGOUT: 'user.logout'
};

@Injectable()
export class User {
  constructor(
    private authAdapter: Adapter,
    private alertController: AlertController,
    private auth: Authentication,
    private events: Events) {}

  login(user: string, password: string) {
    this.authAdapter
        .setIdentity(user)
        .setCredential(password);

    return new Promise((resolve, reject) => {
      this.auth.authenticate().then((result) => {
        this.events.publish(UserEvents.LOGIN_SUCCESS, result);
        resolve(result);
      }).catch((err) => {
        this.events.publish(UserEvents.LOGIN_FAILURE, err);
        reject(err);
      });
    });
  }

  logout() {
    this.events.publish(UserEvents.LOGOUT, this.getData());
    this.auth.clear();
  }

  confirmLogout() {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        title: null,
        message: 'Tem certeza que deseja sair do aplicativo?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: reject
          },
          {
            text: 'Sim',
            handler: () => {
              this.logout();
              resolve();
            }
          }
        ]
      }).present();
    });
  }

  getData(): Object {
    return this.auth.getData();
  }
}
