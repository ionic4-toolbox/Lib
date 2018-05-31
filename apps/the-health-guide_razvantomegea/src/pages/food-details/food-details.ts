// App
import { Component } from '@angular/core';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

// Models
import { Food } from '../../models';

// Providers
import { FoodService } from '../../providers';

@Component({
  selector: 'page-food-details',
  templateUrl: 'food-details.html'
})
export class FoodDetailsPage {
  public food: Food;
  constructor(
    private _alertCtrl: AlertController,
    private _foodSvc: FoodService,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _params: NavParams
  ) { }

  ionViewWillEnter(): void {
    let loader: Loading = this._loadCtrl.create({
      content: 'Loading...',
      spinner: 'crescent',
      duration: 30000
    });
    loader.present();
    this._foodSvc.getFoodReports$(this._params.get('id')).subscribe((data: Food) => {
      this.food = Object.assign({}, data);
      loader.dismissAll();
    }, (err: Error) => {
      this._alertCtrl.create({
        title: 'Uhh ohh...',
        subTitle: 'Something went wrong',
        message: err.toString(),
        buttons: ['OK']
      }).present();
      loader.dismissAll();
      this._navCtrl.pop();
    });
  }
}