import { Pref } from './../../models/IPref';
import { ForecastHour, Hour } from './../../models/IForeCastHour';
import { Place } from './../../models/IPlace';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { EVENTS, Degree, Volume, Speed } from '../../providers/strings';

@Component({
  selector: 'page-by-hour',
  templateUrl: 'by-hour.html',
})
export class ByHourPage {

  search: Place;
  forecasts: ForecastHour[];
  pref: Pref;

  deg = Degree;
  vol = Volume;
  speed = Speed;

  constructor(public navCtrl: NavController, param: NavParams, event: Events) {
    this.search = param.data.search;
    this.forecasts = param.data.forecasts;
    this.pref = param.data.pref;
    event.subscribe(EVENTS.change, (pref: Pref) => this.pref = pref);
  }

  getDate(hour: Hour) {
    return [hour.month_name, hour.mday].join(" ");
  }

  insertHeader(forecast: ForecastHour, index: number) {
    let hour = forecast.FCTTIME;
    if (hour.hour == "0" && index != 0) {
      // cannot access getDate from here
      return hour;
    }
    return null;
  }
}