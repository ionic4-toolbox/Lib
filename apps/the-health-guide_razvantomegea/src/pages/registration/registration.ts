// App
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPageMetadata, Loading, LoadingController, NavController } from 'ionic-angular';
import { Auth, IDetailedError, User, UserDetails } from '@ionic/cloud-angular';

// Pages
import { LoginPage } from '../login/login';
import { FitnessPage } from '../fitness/fitness';

// Providers
import { AuthValidator } from '../../providers';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public email: AbstractControl;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public loginPage: IonicPageMetadata = LoginPage;
  public password: AbstractControl;
  public passwordConfirm: AbstractControl;
  public registerForm: FormGroup;
  constructor(
    private _alertCtrl: AlertController,
    private _auth: Auth,
    private _formBuilder: FormBuilder,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _user: User
  ) {
    this.registerForm = this._formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, AuthValidator.emailValidator,
        AuthValidator.noWhiteSpace])
      ],
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20), AuthValidator.noWhiteSpace])
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20), AuthValidator.noWhiteSpace])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16),
        AuthValidator.passwordValidator, AuthValidator.noWhiteSpace])
      ],
      passwordConfirm: ['', Validators.required]
    }, { validator: AuthValidator.passwordMatchValidator });
    this.email = this.registerForm.get('email');
    this.firstName = this.registerForm.get('firstName');
    this.lastName = this.registerForm.get('lastName');
    this.password = this.registerForm.get('password');
    this.passwordConfirm = this.registerForm.get('passwordConfirm');
  }

  public register(form: { email: string, firstName: string, lastName: string, password: string }): void {
    let loader: Loading = this._loadCtrl.create({
      content: 'Creating your account...',
      spinner: 'crescent',
      duration: 30000
    });
    loader.present();
    let details: UserDetails = {
      'custom': {
        'firstName': form.firstName,
        'lastName': form.lastName
      },
      'email': form.email.trim(),
      'image': '',
      'name': `${form.firstName.trim()} ${form.lastName.trim()}`,
      'password': form.password.trim(),
      'username': `${form.firstName.trim().toLocaleLowerCase()}${form.lastName.trim().toLocaleLowerCase()}`
    };
    this._auth.signup(details)
      .then(() => {
        this._auth.login('basic', details)
          .then(() => {
            loader.dismissAll();
            this._navCtrl.setRoot(FitnessPage);
          })
          .catch((err: IDetailedError<Array<string>>) => {
            loader.dismissAll();
            for (let e of err.details) {
              this._alertCtrl.create({
                title: 'Uhh ohh...',
                subTitle: 'Something went wrong',
                message: AuthValidator.getErrorMessage(e, err),
                buttons: ['OK']
              }).present();
            }
          });
      })
      .catch((err: IDetailedError<Array<string>>) => {
        loader.dismissAll();
        for (let e of err.details) {
          this._alertCtrl.create({
            title: 'Uhh ohh...',
            subTitle: 'Something went wrong',
            message: AuthValidator.getErrorMessage(e, err),
            buttons: ['OK']
          }).present();
        }
      });
  }

  ionViewWillEnter(): void {
    if (this._auth.isAuthenticated()) {
      this._navCtrl.setRoot(FitnessPage);
    }
  }
}
