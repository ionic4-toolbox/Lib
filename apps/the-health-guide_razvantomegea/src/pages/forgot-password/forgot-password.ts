// App
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPageMetadata, LoadingController, NavController } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';

// Pages
import { PasswordResetPage } from '../password-reset/password-reset';

// Providers
import { AuthValidator } from '../../providers';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  public forgotPasswordForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public pswResetPage: IonicPageMetadata = PasswordResetPage;
  constructor(
    private _alertCtrl: AlertController,
    private _auth: Auth,
    private _loadCtrl: LoadingController,
    private _fb: FormBuilder,
    private _navCtrl: NavController
  ) {

    this.forgotPasswordForm = _fb.group({
      email: [
        '',
        Validators.compose([Validators.required, AuthValidator.emailValidator,
        AuthValidator.noWhiteSpace])
      ]
    });
    this.email = this.forgotPasswordForm.get('email');
  }

  public reqestReset(form: { email: string }): void {
    let loader = this._loadCtrl.create({
      content: 'Sending request...',
      spinner: 'crescent',
      duration: 30000
    });
    loader.present();
    this._auth.requestPasswordReset(form.email)
      .then(() => {
        loader.dismissAll();
        this._navCtrl.push(PasswordResetPage, { email: form.email });
      })
      .catch(err => {
        loader.dismissAll();
        this._alertCtrl.create({
          title: 'Uhh ohh...',
          subTitle: 'Something went wrong',
          message: err.response.body.error.message,
          buttons: ['OK']
        }).present();
      });
  }
}