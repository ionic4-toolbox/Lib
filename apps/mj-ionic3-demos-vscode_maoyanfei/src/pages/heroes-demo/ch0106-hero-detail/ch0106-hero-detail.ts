import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '@angular/common';

import { Hero } from '../../../providers/hero';
//import { Ch0106HeroService } from '../../../providers/ch0106-hero-service';

@IonicPage()
@Component({
  selector: 'page-ch0106-hero-detail',
  templateUrl: 'ch0106-hero-detail.html',
})
export class Ch0106HeroDetailPage implements OnInit {
  hero: Hero;
  constructor(
    //private heroService: Ch0106HeroService,
    private location: Location,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Ch0106HeroDetailPage');
  // }

  ngOnInit(): void {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    //   .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
