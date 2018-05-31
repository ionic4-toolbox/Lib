import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Hero } from '../../../providers/hero';
import { Ch0106HeroService } from '../../../providers/ch0106-hero-service';

@IonicPage()
@Component({
  selector: 'page-ch0106-heroes',
  templateUrl: 'ch0106-heroes.html',
  providers: [
    Ch0106HeroService
  ]
})
export class Ch0106HeroesPage implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: Ch0106HeroService,
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
  }

  gotoDetail(): void {
    //this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
