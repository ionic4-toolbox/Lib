import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Hero} from '../../../providers/hero';

@IonicPage()
@Component({
  selector: 'page-ch0104-hero-detail',
  templateUrl: 'ch0104-hero-detail.html',
})
export class Ch0104HeroDetailPage {

  hero: Hero;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hero = navParams.get('hero');
  }
}
