import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Hero} from '../../../providers/hero';

@IonicPage()
@Component({
  selector: 'page-ch0102-heroes',
  templateUrl: 'ch0102-heroes.html',
})
export class Ch0102HeroesPage {

  hero: Hero = {
    id: 1,
    name: '张三'
  };
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
