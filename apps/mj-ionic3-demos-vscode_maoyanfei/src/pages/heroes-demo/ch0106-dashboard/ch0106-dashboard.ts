import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Hero } from '../../../providers/hero';
import { Ch0106HeroService } from '../../../providers/ch0106-hero-service';

@IonicPage()
@Component({
  selector: 'page-ch0106-dashboard',
  templateUrl: 'ch0106-dashboard.html',
})
export class Ch0106DashboardPage implements OnInit {

  title = 'Tour of Heroes';
  heroes: Hero[];
  
  constructor(
    private heroService: Ch0106HeroService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

}
