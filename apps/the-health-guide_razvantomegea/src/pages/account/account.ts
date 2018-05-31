// App
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, AlertOptions, LoadingController, NavController, Toast, ToastController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { Camera } from '@ionic-native/camera';

// Pages
import { RegistrationPage } from '../registration/registration';

// Providers
import { PictureService } from '../../providers';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  @ViewChild('fileInput') fileInput;
  public avatar: string;
  public uploadReady: boolean = false;
  constructor(
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController,
    private _auth: Auth,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _picService: PictureService,
    private _toastCtrl: ToastController,
    private _user: User
  ) {
    this.avatar = _user.details.image;
  }

  private _deleteAccount(): void {
    let loader = this._loadCtrl.create({
      content: 'Deleting account...',
      spinner: 'crescent',
      duration: 30000
    });

    loader.present();
    this._user.delete();
    this._user.unstore();
    this._auth.logout();
    loader.dismissAll();
    this._navCtrl.setRoot(RegistrationPage);
  }

  public changeImage(): void {
    if (Camera['installed']()) {
      this._actionSheetCtrl.create({
        title: 'Change image',
        buttons: [
          {
            text: 'Take photo',
            handler: () => {
              this._picService.takePhoto().then((photoUri: string) => {
                this.avatar = photoUri;
                this.uploadImage();
              }).catch((err: Error) => this._alertCtrl.create({
                title: 'Uhh ohh...',
                subTitle: 'Something went wrong',
                message: err.toString(),
                buttons: ['OK']
              }).present());
            }
          }, {
            text: 'Choose image',
            handler: () => {
              this._picService.chooseImage().then((photoUri: string) => {
                this.avatar = photoUri;
                this.uploadImage();
              }).catch((err: Error) => this._alertCtrl.create({
                title: 'Uhh ohh...',
                subTitle: 'Something went wrong',
                message: err.toString(),
                buttons: ['OK']
              }).present());
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  public deleteAccountRequest(): void {
    let alertOpt: AlertOptions = {
      title: 'Are you sure you want this?',
      message: 'Your account will be permanently erased and all data will be lost',
      buttons: [
        {
          text: 'Maybe not',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this._deleteAccount();
          }
        }
      ]
    };

    this._alertCtrl.create(alertOpt).present();
  }

  public processWebImage(event) {
    let reader: FileReader = new FileReader();
    reader.onload = (readerEvent: Event) => {
      this.uploadImage(event.target.files[0]);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  public signout(): void {
    this._auth.logout();
    this._navCtrl.setRoot(RegistrationPage);
  }

  public uploadImage(file?: File): void {
    let canceledUpload: boolean = false,
      toast: Toast = this._toastCtrl.create({
        message: 'Uploading ... 0%',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Cancel'
      });
    toast.present();
    toast.onWillDismiss(() => {
      canceledUpload = true;
      this._picService.cancelUpload();
    });

    this._picService.uploadImage('recipes', file).subscribe((data: string | number) => {
      if (typeof data === 'number') {
        toast.setMessage(`Uploading ... ${data}%`);
      } else {
        this.avatar = data;
        this._user.details.image = this.avatar;
        this._user.save();
      }
    }, (err: Error) => {
      toast.setMessage('Uhh ohh, something went wrong!');
    },
      () => {
        if (canceledUpload === true) {
          this._toastCtrl.create({
            message: 'Upload canceled',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            duration: 10000
          }).present();
        } else {
          toast.dismissAll();
          this._toastCtrl.create({
            message: 'Upload complete!',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            duration: 10000
          }).present();
        }
      });
  }

  ionViewDidEnter(): void {
    if (!!this.avatar) {
      this._toastCtrl.create({
        message: 'Hint: Click the avatar to change it',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK',
        duration: 10000
      }).present();
    }
  }
}
