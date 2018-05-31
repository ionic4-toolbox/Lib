import { Home, Login } from '../index';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Authentication } from '@mbamobi/authentication';
import { App, IonicPage } from 'ionic-angular';

export const KeyStorageOnboard = '_onboard';

@IonicPage({
  name: 'onboard'
})
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html'
})
export class OnboardPage {

  slides = [{
    title: 'Bem vindo a aplicação Starter MBA!',
    description: 'A <b>Ionic-Starter</b> irá apresentar para você alguns exemplos de implementação de recursos ionic.'
  }, {
    title: 'O que já foi implementado?',
    description: 'A <b>Ionic-Starter</b> Já possui implementado além de diversos recursos de acesso a dados e controle de erros algumas páginas para simplificar seu trabalho.'
  }, {
    title: 'Como posso contribuir?',
    description: 'O projeto <b>Ionic-Starter</b> é o projeto base criado pelos desenvolvedores da MBA, e toda contribuição e bem vinda, siga as recomendações e ajude a deixar a solução cada vez mais completa.'
  }];

  constructor(private app: App, private storage: Storage, private auth: Authentication) {}

  openHome() {
    this.app.getActiveNav().setRoot(Home);
  }

  close() {
    this.storage.set(KeyStorageOnboard, true);

    if (Login) {
      if (!this.auth.has()) {
        this.app.getActiveNav().setRoot(Login);
      } else {
        this.openHome();
      }
    } else {
      this.openHome();
    }
  }
}
