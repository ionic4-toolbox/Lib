import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-basic-button',
  templateUrl: 'basic-button.html',
})
export class BasicButtonPage {

  constructor(public navCtrl: NavController) {

  }

  setOnClick(btnObj) {
    alert(btnObj + " Clicked.");
  }
}
