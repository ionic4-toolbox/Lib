import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BasicButtonPage } from '../buttons/basic-button/basic-button';
import { IconsButtonPage } from '../buttons/icons-button/icons-button';
import { ButtonComponentsPage } from '../buttons/button-components/button-components';

@Component({
  selector: 'page-button',
  templateUrl: 'button.html'
})

export class ButtonPage {
  tabBasicButtonPage = BasicButtonPage;
  tabIconsButtonPage = IconsButtonPage;
  tabButtonComponentsPage = ButtonComponentsPage;

  constructor(public navCtrl: NavController) {

  }

  openPage(pageName) {
    if (pageName == "basic-buttons") {
      this.navCtrl.push(BasicButtonPage);
    } else if (pageName == "icon-buttons") {
      this.navCtrl.push(IconsButtonPage);
    } else if (pageName == "button-components") {
      this.navCtrl.push(ButtonComponentsPage);
    }
  }
}
