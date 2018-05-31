import { Place } from './../../models/IPlace';
import { CurrentObservation } from './../../models/ICurrentObservation';
import { DataService } from './../../services/data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Refresher, NavParams, Events, Content } from 'ionic-angular';
import { Pref } from '../../models/IPref';
import { Feature, Degree, Volume, Speed, Pressure, Distance, Observation, EVENTS, CurrentView } from '../../providers/strings';
import { Astronomy } from '../../models/IAstronomy';

@Component({
  templateUrl: 'current.html'
})
export class Current implements OnInit {

  forecast: CurrentObservation;
  astro: Astronomy;
  search: Place;
  pref: Pref;
  error = {default: null, extra: null};
  view = CurrentView.default;
  mode = CurrentView;
  obs = Observation;

  @ViewChild(Content) content: Content;

  constructor(private event: Events, param: NavParams, private ds: DataService, private loadingCtrl: LoadingController) {
    this.search = param.data.search;
    this.pref = param.data.pref;
    event.subscribe(EVENTS.change, pref => this.pref = pref);
    // account for when this tab gets constructed before initialization complets
    event.subscribe(EVENTS.init, pref => this.pref = pref);
  }

  ngOnInit() {
    this.fetchData(null);    
  }

  getObservation(obs: Observation) {
    switch (obs) {
      case Observation.temp:
        return this.pref.degree == Degree.metric ? this.forecast.temp_c : this.forecast.temp_f;
      case Observation.precip:
        return this.pref.volume == Volume.metric ? this.forecast.precip_1hr_metric : this.forecast.precip_1hr_in;
      case Observation.wind:
        return this.pref.speed == Speed.metric ? this.forecast.wind_kph : this.forecast.wind_mph;
      case Observation.pressure:
        return this.pref.pressure == Pressure.metric ? this.forecast.pressure_mb : this.forecast.pressure_in;
      case Observation.visibility:
        return this.pref.distance == Distance.metric ? this.forecast.visibility_km : this.forecast.visibility_mi;
    }
  }

  private async fetchData(refresher: Refresher) {
    if (!refresher) {
      var loader = this.loadingCtrl.create({
        content: "Plsease wait..."
      });
      loader.present();
    }
    await this.ds.getForecast(Feature.now, this.search).then(res => {
      try {
        this.forecast = <CurrentObservation>res.json().current_observation;
      } catch (error) {
        throw new Error("Failed to fetch data from API");
      }
      if (!this.search) {
        let loc = this.forecast.display_location;
        this.search = new Place({ lat: loc.latitude, lon: loc.longitude }, loc.city, loc.state, loc.country_iso3166, true);
        this.event.publish(EVENTS.gps, this.search);
      }
      this.content.resize();
      this.error.default = null;
    }).catch(err => {
      console.error(err);
      this.error.default = err;
    });
    await this.ds.getForecast(Feature.extra, this.search).then(res => {
      try {
        this.astro = <Astronomy>res.json().moon_phase;
      } catch (error) {
        throw new Error("Failed to fetch data from API");
      }
      this.error.extra = null;
    }).catch(err => {
      console.error(err);
      this.error.extra = err;
    });
    refresher ? refresher.complete() : loader.dismiss();
  }

}
