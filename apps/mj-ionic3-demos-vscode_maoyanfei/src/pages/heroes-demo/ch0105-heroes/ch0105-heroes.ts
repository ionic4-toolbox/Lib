import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Hero} from '../../../providers/hero';
import {Ch0105HeroService} from '../../../providers/ch0105-hero-service';

@IonicPage()
@Component({
  selector: 'page-ch0105-heroes',
  templateUrl: 'ch0105-heroes.html',
  providers: [
    Ch0105HeroService
  ]
})
export class Ch0105HeroesPage {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService:Ch0105HeroService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.navCtrl.push('Ch0104HeroDetailPage', {hero});
  }

}
