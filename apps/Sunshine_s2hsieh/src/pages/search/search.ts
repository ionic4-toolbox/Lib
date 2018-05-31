import { TabsPage } from './../tabs/tabs';
import { DataService } from './../../services/data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Searchbar } from 'ionic-angular';
import { Place } from '../../models/IPlace';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  templateUrl: 'search.html',
})
export class SearchPage {

  places: Observable<Place[]>;
  @ViewChild(Searchbar) searchbar: Searchbar;

  constructor(public navCtrl: NavController, private data: DataService) {}

  onInput(ev) {
    let search: string = ev.target.value;
    if (search) {
      this.places = this.data.searchLocation(search);
    } else {
      this.places = null;
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    });
  }

  openForecast(place: Place) {
    this.navCtrl.push(TabsPage, { place: place });
  }
}