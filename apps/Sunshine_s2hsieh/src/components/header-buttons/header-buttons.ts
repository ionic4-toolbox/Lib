import { PreferencesService } from './../../services/preferences';
import { Place } from './../../models/IPlace';
import { Pref } from './../../models/IPref';
import { Component, Input, OnInit } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';
import { Events, PopoverController, NavController } from 'ionic-angular';
import { EVENTS } from '../../providers/strings';
import { LocationSelectComponent } from '../location-select/location-select';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'header-buttons',
  templateUrl: 'header-buttons.html'
})
export class HeaderButtonsComponent implements OnInit {

  @Input() pref: Pref;
  @Input() search: Place;
  placeAdded: boolean;

  constructor(private popOverCrl: PopoverController, private event: Events, private appCtrl: App, private ps: PreferencesService) { }

  ngOnInit() {
    // my custom toString is missing after passing through @Input, hence recreate the objects as the Place class again
    this.pref.locations = this.pref.locations.map(v => new Place(v.cord, v.city, v.provOrState, v.country))
    this.placeAdded = this.isSaved();
  }

  openSavedList(ev) {
    let data = { locations: this.pref.locations, search: this.search, isSaved: this.placeAdded }
    let list = this.popOverCrl.create(LocationSelectComponent, data);
    list.onDidDismiss((place: Place) => {
      if (place === null) {
        return;
      } else if (typeof place === "undefined") {
        (<NavController>this.appCtrl.getRootNav()).push(TabsPage);
      } else if (place.toString() != this.search.toString()) {
        (<NavController>this.appCtrl.getRootNav()).push(TabsPage, { place: place });
      }
    });
    list.present({ ev: ev });
  }

  openSearch() {
    (<NavController>this.appCtrl.getRootNav()).push("SearchPage");
  }

  openPref() {
    (<NavController>this.appCtrl.getRootNav()).push("PrefPage", { pref: this.pref });
  }

  private isSaved() {
    return this.pref.locations.findIndex(v => v.toString() == this.search.toString()) >= 0;
  }

  toggleAddState() {
    if (this.placeAdded) {
      // remove place
      this.pref.locations = this.pref.locations.filter(v => v.toString() !== this.search.toString());
    } else {
      // add place
      if (this.search.isGPS) {
        let save = new Place(this.search.cord, this.search.city, this.search.provOrState, this.search.country);
        this.pref.locations.push(save);
      } else {
        this.pref.locations.push(this.search);
      }
    }
    this.ps.setPref(this.pref).then(p => {
      this.placeAdded = !this.placeAdded;
      this.event.publish(EVENTS.change, this.pref);
    });
  }

}
