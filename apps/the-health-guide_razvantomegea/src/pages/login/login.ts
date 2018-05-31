// App
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPageMetadata, LoadingController, NavController } from 'ionic-angular';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';

// Pages
import { FitnessPage } from '../fitness/fitness';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

// Providers
import { AuthValidator } from '../../providers';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public forgotPasswordPage: IonicPageMetadata = ForgotPasswordPage;
  public email: AbstractControl;
  public loginForm: FormGroup;
  public password: AbstractControl;
  constructor(
    private _alertCtrl: AlertController,
    private _auth: Auth,
    private _formBuilder: FormBuilder,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _user: User
  ) {
    this.loginForm = _formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, AuthValidator.emailValidator,
        AuthValidator.noWhiteSpace])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16),
        AuthValidator.passwordValidator, AuthValidator.noWhiteSpace])
      ]
    });
    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
  }

  public login(form: { email: string, password: string }): void {
    let loader = this._loadCtrl.create({
      content: 'Please wait...',
      spinner: 'crescent',
      duration: 30000
    });
    loader.present();
    let details: UserDetails = {
      'email': form.email.trim(),
      'password': form.password.trim(),
    };
    this._auth.login('basic', details)
      .then(() => {
        loader.dismissAll();
        this._navCtrl.setRoot(FitnessPage);
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
