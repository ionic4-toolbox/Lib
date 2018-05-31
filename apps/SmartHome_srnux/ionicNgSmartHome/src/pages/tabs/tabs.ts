import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Temperature} from '../temperature/temperature'
import {EmailNotification} from '../emailNotification/emailNotification'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EmailNotification;
  tab3Root = Temperature;
  tab4Root = ContactPage;

  constructor() {

  }
}
