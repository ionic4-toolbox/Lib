import { EnvToken } from '../app/app.env';
import { Login } from '../pages';
import { ErrorHandler as ErrorHandlerAngular, forwardRef, Inject, Injectable, } from '@angular/core';
import { Response } from '@angular/http';
import { Authentication } from '@mbamobi/authentication';
import { HttpException } from '@mbamobi/http';
import { NoConnectionException } from '@mbamobi/http-plugins-ionic';
import { IonicErrorHandler, ModalController, ToastController } from 'ionic-angular';

@Injectable()
export class ErrorHandler extends IonicErrorHandler implements ErrorHandlerAngular {

  constructor(
    private auth: Authentication,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    @Inject(forwardRef(() => EnvToken)) private env: string
  ) {
    super();
  }

  handleError(error: any): void {

    let originalError = error;

    if (error.rejection) {
      originalError = error.rejection;
    }

    if (originalError instanceof Response) { // workaround pular exception subscribe ou promise
      return;
    }

    if (originalError instanceof NoConnectionException) {
      if (!Login) {
        this.createModalConectivity();
        return;
      }

      if (this.auth.has()) {
        this.createModalConectivity();
        return;
      }

      const toast = this.toastCtrl.create({
        message: 'Sem conexão',
        duration: 4000,
        position: 'top'
      });

      toast.present();
    }

    if (originalError instanceof HttpException) {
      const toast = this.toastCtrl.create({
        message: originalError.message,
        duration: 4000,
        position: 'top'
      });

      toast.present();
    }

    if ('dev' === this.env) {
      super.handleError(error);
    }
  }

  private createModalConectivity() {
    const modal = this.modalCtrl.create('erro-conectividade');
    modal.present({animate: false});
  }
}

export const ERROR_HANDLER = {
  provide: ErrorHandlerAngular, useClass: ErrorHandler
};
