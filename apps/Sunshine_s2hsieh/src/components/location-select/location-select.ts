import { Pref } from './../../models/IPref';
import { Component } from '@angular/core';
import { Place } from '../../models/IPlace';
import { NavParams, Events, ViewController } from 'ionic-angular';
import { EVENTS } from '../../providers/strings';

@Component({
  selector: 'location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelectComponent {

  locations: Place[];
  search: Place;
  isNew: boolean;

  constructor(private viewCtrl: ViewController, param: NavParams, event: Events) {
    this.locations = param.data.locations;
    this.search = param.data.search;
    this.isNew = !param.data.isSaved;

    // the constructor only runs once per page, hence must subscribe to preference changes
    event.subscribe(EVENTS.change, (pref: Pref) => this.locations = pref.locations);
  }

  selected(place: Place) {
    this.viewCtrl.dismiss(place)
  }

  isCurrent(place: Place) {
    return place.toString() == this.search.toString() && this.search.isGPS;
  }
}
