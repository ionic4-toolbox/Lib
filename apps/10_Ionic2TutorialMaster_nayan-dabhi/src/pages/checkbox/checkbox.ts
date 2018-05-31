import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PersonListProvider } from '../../providers/person-list/person-list';
import { CommonController } from '../../providers/CommonController';

@Component({
  selector: 'page-check-box',
  templateUrl: 'checkbox.html',
  providers: [PersonListProvider]
})

export class CheckBoxPage {
  public persons: any;
  public loader: any;
  public selectedPersons: any;
  public response: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public personListProvider: PersonListProvider,
    public commonCtrl: CommonController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.loadData();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.onDidDismiss(() => {
      // console.log('Dismissed loading');
    });

    this.loader.present();
  }

  loadData() {
    this.presentLoading();

    this.personListProvider.load()
      .then(data => {
        this.loader.dismiss();

        if (data != null) {
          this.response = data;

          if (this.response.length > 0) {
            this.persons = data;

            for (let i = 0; i < this.persons.length; i++) {
              this.persons[i].isChecked = false;
            }
          }
        } else {
          this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
        }
      }).catch(error => {
        this.loader.dismiss();
        this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CheckBoxPage');
  }

  openConfirmPopUp(index) {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.persons[index].isChecked = false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.persons[index].isChecked = true;
          }
        }
      ]
    });

    confirm.present();
  }

  getSelectedPersons() {
    this.selectedPersons = this.persons.filter((item) => {
      return item.isChecked;
    });

    if (this.selectedPersons != null && this.selectedPersons.length > 0) {
      for (let i = 0; i < this.selectedPersons.length; i++) {
        console.log(this.selectedPersons[i]);
      }
    }
  }
}
