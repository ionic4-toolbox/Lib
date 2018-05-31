import { ByHourPage } from './../../pages/by-hour/by-hour';
import { Component, Input } from '@angular/core';
import { ForecastDay, Date } from '../../models/IForeCastDay';
import { Pref } from '../../models/IPref';
import { Degree, Speed, Volume, Feature } from '../../providers/strings';
import { Place } from '../../models/IPlace';
import { ForecastHour } from '../../models/IForeCastHour';
import { DataService } from '../../services/data';
import { App, NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'forecast-list',
  templateUrl: 'forecast-list.html'
})
export class ForecastListComponent {

  @Input() forecasts: ForecastDay[];
  @Input() pref: Pref;
  @Input() search: Place;
  forecastsByHour: ForecastHour[];

  deg = Degree;
  speed = Speed;
  vol = Volume;

  constructor(private appCtrl: App, private ds: DataService, private loadingCtrl: LoadingController) { }

  openHourlyForecast(date: Date) {
    let loader = this.loadingCtrl.create({content: "Please wait..."});
    if (this.forecastsByHour) {
      this.processData(date);
    }else{
      loader.present();
      // this will save on api calls
      this.ds.getForecast(Feature.hourly, this.search).then(res => {
        try {
          this.forecastsByHour = res.json().hourly_forecast;
        } catch (err) {
          throw new Error(err);
        }
        loader.dismiss();
        this.processData(date);
      });
    }
  }

  private processData(date: Date) {
    let index = this.forecastsByHour.findIndex(hour => date.day == +hour.FCTTIME.mday);
    let dayForecast = this.forecastsByHour.slice(index, index+24);
    let data = {search: this.search, pref: this.pref, forecasts: dayForecast};
    (<NavController>this.appCtrl.getRootNav()).push(ByHourPage, data);
  }
}
