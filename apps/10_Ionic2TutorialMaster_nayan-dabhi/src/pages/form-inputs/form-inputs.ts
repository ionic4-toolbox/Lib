import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RangePage } from '../../pages/form-inputs/range/range';

@Component({
  selector: 'page-form-inputs',
  templateUrl: 'form-inputs.html',
})

export class FormInputsPage {
  public name: any;
  public languages: any;
  public pushNotify:any = true;
  public smsNotify:any = true;

  public event = {
    startDate: '1990-02-19',
    endDate: '1990-02-20',
    startTime: '07:43'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = "";
    this.languages = "Java";
  }

  ionViewDidLoad() {
    // to-do
  }

  doChangeLang() {
    // console.log(this.languages);
  }

  doChangeNotify() {
    // console.log("Toggle Button Change.");
  }

  openPage(pageName) {
    if (pageName == 'range') {
      this.navCtrl.push(RangePage);
    }
  }
}
