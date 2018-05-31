import { Component, OnInit } from '@angular/core';
import { Refresher, NavParams, LoadingController, Events } from 'ionic-angular';
import { Place } from '../../models/IPlace';
import { DataService } from '../../services/data';
import { ForecastDay } from '../../models/IForeCastDay';
import { Feature, Observation, EVENTS } from '../../providers/strings';
import { Pref } from '../../models/IPref';

@Component({
  templateUrl: 'ten-days.html'
})
export class TenDays implements OnInit {

  forecasts: ForecastDay[];
  search: Place;
  pref: Pref;
  error: any;
  obs = Observation;

  constructor(event: Events, param: NavParams, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data.search;
    this.pref = param.data.pref;
    event.subscribe(EVENTS.change, pref => this.pref = pref);
  }

  ngOnInit() {
    this.fetchData(null);
  }

  fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    this.ds.getForecast(Feature.ten, this.search).then(res => {
      try {
        this.forecasts = <ForecastDay[]>res.json().forecast.simpleforecast.forecastday;
      } catch (error) {
        throw new Error("Failed to fetch data from API");
      }
      // to allow hourly forecast to have enough data to work with
      this.forecasts.pop();
      this.error = null;
      refresher ? refresher.complete() : loader.dismiss();
    }).catch(err => {
      this.error = err;
      console.log(err);
      refresher ? refresher.complete() : loader.dismiss();
    });
  }

}
