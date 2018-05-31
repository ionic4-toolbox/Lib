import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})

export class AlertPage {
  selectedRadio = 'blue';
  selectedCheckbox = "";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController) {
      // default constructor
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
      buttons: ['Ok']
    });

    alert.present();
  }

  showConfirm() {
    let Confirm = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });

    Confirm.present();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      }, {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
          text: 'Login',
          handler: data => {
            if (data.username && data.password) {
              console.log("username : " + data.username);
              console.log("password : " + data.password);

              return true;
            } else {
              return false;
            }
          }
        }]
    });

    prompt.present();
  }

  showRadioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: this.selectedRadio == 'blue' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Green',
      value: 'green',
      checked: this.selectedRadio == 'green' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Red',
      value: 'red',
      checked: this.selectedRadio == 'red' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Yellow',
      value: 'yellow',
      checked: this.selectedRadio == 'yellow' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Purple',
      value: 'purple',
      checked: this.selectedRadio == 'purple' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'White',
      value: 'white',
      checked: this.selectedRadio == 'white' ? true : false
    });

    alert.addInput({
      type: 'radio',
      label: 'Black',
      value: 'black',
      checked: this.selectedRadio == 'black' ? true : false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.selectedRadio = data;
        console.log('Radio data:', data);
      }
    });

    alert.present().then(() => {
      // Open Radio Alert
    });
  }

  showCheckboxAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Coruscant',
      value: 'value3'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Endor',
      value: 'value4'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Hoth',
      value: 'value5'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Jakku',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Naboo',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Takodana',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Tatooine',
      value: 'value6'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.selectedCheckbox = data;
        console.log('Checkbox data:', data);
      }
    });

    alert.present().then(() => {
      // Open Checkbox Alert
    });
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: 'heart-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
