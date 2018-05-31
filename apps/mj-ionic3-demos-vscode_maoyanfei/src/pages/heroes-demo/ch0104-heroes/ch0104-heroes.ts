import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Hero} from '../../../providers/hero';

const HEROES: Hero[] = [
  { id: 11, name: '张三' },
  { id: 12, name: '李四' },
  { id: 13, name: '王五' },
  { id: 14, name: '赵六' },
  { id: 15, name: '陈七' },
  { id: 16, name: '张三一' },
  { id: 17, name: '李四二' },
  { id: 18, name: '王五三' },
  { id: 19, name: '赵六四' },
  { id: 20, name: '陈七五' }
];

@IonicPage()
@Component({
  selector: 'page-ch0104-heroes',
  templateUrl: 'ch0104-heroes.html',
})
export class Ch0104HeroesPage {

  heroes=HEROES;
  selectedHero: Hero;

  constructor( public navCtrl: NavController, public navParams: NavParams) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.navCtrl.push('Ch0104HeroDetailPage', {hero});
  }

}
