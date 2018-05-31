// App
import { Component } from '@angular/core';
import { AlertController, InfiniteScroll, Loading, LoadingController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// Third-party
import { FirebaseListObservable } from 'angularfire2/database';

// Models
import { Food, FoodGroup, IFoodSearchResult, Recipe } from '../../models';

// Providers
import { FOOD_GROUPS, FoodService, RecipeService } from '../../providers';

@Component({
  selector: 'page-food-select',
  templateUrl: 'food-select.html'
})
export class FoodSelectPage {
  private _foodSubscription: Subscription;
  private _querying: boolean = false;
  public foods: Array<IFoodSearchResult>;
  public foodLimit: number = 50;
  public groups: Array<FoodGroup> = [...FOOD_GROUPS];
  public recipeLimit: number = 50;
  public recipes$: FirebaseListObservable<Array<Recipe>>;
  public searchQueryFoods: string = '';
  public searchQueryRecipes: string = '';
  public selectedGroup: FoodGroup = this.groups[0];
  public selectedItem: IFoodSearchResult | Recipe;
  public selectedServings: number = 0;
  public selectionSegment: string = 'foods';
  public start: number;
  constructor(
    private _alertCtrl: AlertController,
    private _foodSvc: FoodService,
    private _loadCtrl: LoadingController,
    private _recipeSvc: RecipeService,
    private _viewCtrl: ViewController
  ) { }

  public clearSearchFoods(ev: string): void {
    this.searchQueryFoods = '';
    this.refreshItems();
  }

  public clearSearchRecipes(ev: string): void {
    this.searchQueryRecipes = '';
  }

  public doneSelecting(): void {
    if (!!this.selectedItem && this.selectedItem.hasOwnProperty('ndbno')) {
      this._foodSvc.getFoodReports$(this.selectedItem['ndbno']).subscribe((item: Food) => {
        item.servings = this.selectedServings;
        this._viewCtrl.dismiss(item);
      }, (err: Error) => console.log('Error on getting food report: ', err));
    } else if (!!this.selectedItem) {
      this._viewCtrl.dismiss(this.selectedItem);
    } else {
      this._viewCtrl.dismiss();
    }
  }

  public itemParams(id: string): Object {
    return { id }
  }

  public loadMoreFoods(ev: InfiniteScroll) {
    setTimeout(() => {
      this.start += 50;
      if (!!this._foodSubscription) {
        this._foodSubscription.unsubscribe();
      }
      this._foodSubscription = this._foodSvc.getFoods$(this.searchQueryFoods, this.start, this.foodLimit, this.selectedGroup.id)
        .subscribe((data: Array<IFoodSearchResult>) => {
          this.foods.push(...data);
        }, (err: { status: string, message: string }) => this._alertCtrl.create({
          title: 'Uhh ohh...',
          subTitle: 'Something went wrong',
          message: `Error ${err.status}! ${err.message}`,
          buttons: ['OK']
        }).present());
      ev.complete();
    }, 500);
  }

  public loadMoreRecipes(ev: InfiniteScroll) {
    this.recipeLimit += 50;
    setTimeout(() => {
      ev.complete();
    }, 1000);
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
      this._foodSubscription = this._foodSvc.getFoods$(this.searchQueryFoods.toLocaleLowerCase(), this.start, this.foodLimit, this.selectedGroup.id)
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
          this.doneSelecting();
        }
      });
    }
  }

  public selectItem(item: IFoodSearchResult | Recipe, radioInput: HTMLInputElement): void {
    this._alertCtrl.create({
      title: 'Servings',
      subTitle: `${item.name.toString()}`,
      inputs: [
        {
          name: 'servings',
          placeholder: item.hasOwnProperty('chef') ? `Servings x ${item['quantity'].toString()}${item['unit'].toString()}` : 'Servings x 100g',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            radioInput.checked = false;
          }
        },
        {
          text: 'Done',
          handler: (data: { servings: number }) => {
            this.selectedServings = data.servings;
            this.selectedItem = Object.assign({}, item);
          }
        }
      ]
    }).present();
  }

  public showFilter(): void {
    this._alertCtrl.create({
      title: 'Filter foods',
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

  ionViewWillEnter(): void {
    this.refreshItems();
    this.recipes$ = this._recipeSvc.getRecipes$();
  }

  ionViewWillLeave(): void {
    this._foodSubscription.unsubscribe();
  }
}