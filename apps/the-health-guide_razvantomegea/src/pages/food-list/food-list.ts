// App
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPageMetadata, InfiniteScroll, Loading, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// Models
import { IFoodSearchResult, FoodGroup } from '../../models';

// Pages
import { FoodDetailsPage } from '../food-details/food-details';

// Providers
import { FOOD_GROUPS, FoodService } from '../../providers';

@Component({
  selector: 'page-food-list',
  templateUrl: 'food-list.html'
})
export class FoodListPage {
  private _foodSubscription: Subscription;
  private _querying: boolean = false;
  public detailsPage: IonicPageMetadata = FoodDetailsPage;
  public foods: Array<IFoodSearchResult>;
  public groups: Array<FoodGroup> = [...FOOD_GROUPS];
  public limit: number = 50;
  public searchQuery: string = '';
  public selectedGroup: FoodGroup = this.groups[0];
  public start: number;
  constructor(
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController,
    private _foodSvc: FoodService,
    private _loadCtrl: LoadingController
  ) {}

  private _selectGroup(): void {
    this._alertCtrl.create({
      title: 'Filter by groups',
      subTitle: 'Pick a food group',
      inputs: [...this.groups.map((item: FoodGroup) => {
        return {
          type: 'radio',
          label: item.name,
          value: item.id,
          checked: this.selectedGroup.name === item.name
        }
      })],
      buttons: [
        {
          text: 'Done',
          handler: (data: string) => {
            this.selectedGroup = this.groups.filter((item: FoodGroup) => item.id === data)[0];
            this.refreshItems();
          }
        }
      ]
    }).present();
  }

  public clearSearch(ev): void {
    this.searchQuery = '';
    this.refreshItems();
  }

  public itemParams(id: string): Object {
    return { id }
  }

  public loadMore(ev: InfiniteScroll) {
    setTimeout(() => {
      this.start += 50;
      this._foodSvc.getFoods$(this.searchQuery.toLocaleLowerCase(), this.start, this.limit, this.selectedGroup.id)
        .subscribe((data: Array<IFoodSearchResult>) => {
          this.foods.push(...data);
        });
      ev.complete();
    }, 500);
  }

  public refreshItems(): void {
    if (!this._querying) {
      this._querying = true;
      let loader: Loading = this._loadCtrl.create({
        content: 'Loading...',
        spinner: 'crescent',
        duration: 30000
      }), doneLoading: boolean = false;
      loader.present();
      this.start = 0;
      if (!!this._foodSubscription) {
        this._foodSubscription.unsubscribe();
      }

      this._foodSubscription = this._foodSvc.getFoods$(this.searchQuery.toLocaleLowerCase(), this.start, this.limit, this.selectedGroup.id)
        .subscribe((data: Array<IFoodSearchResult>) => {
          this.foods = [...data];
          doneLoading = true;
          loader.dismissAll();
        }, (err: { status: string, message: string }) => {
          doneLoading = true;
          loader.dismissAll();
          this._alertCtrl.create({
            title: 'Uhh ohh...',
            subTitle: 'Something went wrong',
            message: `Error ${err.status}! ${err.message}`,
            buttons: ['OK']
          }).present();
        });
      loader.onDidDismiss(() => {
        this._querying = false;
        if (!doneLoading) {
          this._foodSubscription.unsubscribe();
          this._alertCtrl.create({
            title: 'Uhh ohh...',
            subTitle: 'Something went wrong',
            message: 'The request has timed out. Try again in a few moments!',
            buttons: ['OK']
          }).present();
        }
      });
    }
  }

  public showFilter(): void {
    this._selectGroup();
  }

  ionViewWillLoad(): void {
    this.refreshItems();
  }

  ionViewWillLeave(): void {
    this._foodSubscription.unsubscribe();
  }
}