// App
import { Component } from '@angular/core';
import { ActionSheetController, Alert, AlertController, Modal, ModalController, NavController, NavParams } from 'ionic-angular';

// Models
import { Food, Meal, MealPlan, Recipe } from '../../models';

// Pages
import { FoodSelectPage } from '../food-select/food-select';

// Providers
import { MealService, NutritionService } from '../../providers';

@Component({
  selector: 'page-meal-details',
  templateUrl: 'meal-details.html'
})
export class MealDetailsPage {
  public isDirty: boolean = false;
  public meal: Meal;
  public mealIdx: number;
  public mealDetails: string = 'details';
  public mealPlan: MealPlan;
  constructor(
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController,
    private _mealSvc: MealService,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController,
    private _nutritionSvc: NutritionService,
    private _params: NavParams
  ) {
    this.meal = <Meal>_params.get('meal');
    this.mealPlan = <MealPlan>_params.get('mealPlan');
    this.mealIdx = this.mealPlan.meals.indexOf(this.meal);
    this.meal.mealItems = this.meal.mealItems || [];
  }

  private _changeServings(item: Food | Recipe): void {
    let alert: Alert = this._alertCtrl.create({
      title: 'Servings',
      subTitle: `${item.name.toString()} (${item.quantity.toString()}${item.unit.toString()})`,
      inputs: [
        {
          name: 'servings',
          placeholder: `Servings x ${item.quantity.toString()}${item.unit.toString()}`,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Done',
          handler: data => {
            item.servings = +data.servings;
            this._updateMealDetails();
          }
        }
      ]
    });
    alert.present();
  }

  private _removeItem(idx: number): void {
    this.meal.mealItems = [...this.meal.mealItems.slice(0, idx), ...this.meal.mealItems.slice(idx + 1)];
    this._updateMealDetails();
  }

  private _updateMealDetails(): void {
    this.isDirty = true;
    this.meal.nutrition = Object.assign({}, this._nutritionSvc.calculateNutrition(this.meal.mealItems));
    this.meal.pral = this._mealSvc.calculatePRAL(this.meal.mealItems);
    this.meal.quantity = this._nutritionSvc.calculateQuantity(this.meal.mealItems);
    this._mealSvc.checkMeal(this.meal);
  }

  public addMealItems(): void {
    let mealSelectModal: Modal = this._modalCtrl.create(FoodSelectPage);
    mealSelectModal.present();
    mealSelectModal.onDidDismiss((selection: Food | Recipe) => {
      if (!!selection) {
        this.meal.mealItems = [...this.meal.mealItems, selection];
        this._updateMealDetails();
      }
    })
  }

  public changeItem(idx: number): void {
    this._actionSheetCtrl.create({
      title: 'Change item',
      buttons: [
        {
          text: 'Change servings',
          handler: () => {
            this._changeServings(this.meal.mealItems[idx]);
          }
        }, {
          text: 'Remove item',
          handler: () => {
            this._removeItem(idx);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();
  }

  public markDirty(): void {
    this.isDirty = true;
  }

  public removeMeal(): void {
    this.mealPlan.meals = [...this.mealPlan.meals.slice(0, this.mealIdx), ...this.mealPlan.meals.slice(this.mealIdx + 1)];
    this._mealSvc.saveMealPlan(this.mealPlan);
    this._navCtrl.pop();
  }

  public saveMeal(): void {
    this._updateMealDetails();
    this.mealPlan.meals = this._mealSvc.sortMeals(this.mealPlan.meals);
    if (this.meal.favourite) {
      this._mealSvc.updateFavouriteMeal(this.meal);
    }
    this._mealSvc.saveMealPlan(this.mealPlan);
    this.isDirty = false;
  }

  public toggleFavourite(): void {
    if (!!this.meal.favourite) {
      let alert: Alert = this._alertCtrl.create({
        title: 'Favourite name',
        subTitle: 'Please give a name to your favourite meal',
        inputs: [
          {
            name: 'favouriteName',
            placeholder: 'e.g. My special healthy breakfast',
            type: 'string'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.meal.favourite = false;
            }
          },
          {
            text: 'Done',
            handler: data => {
              this.meal.favouriteName = data.favouriteName;
              this._mealSvc.updateFavouriteMeal(this.meal);
              this.isDirty = true;
            }
          }
        ]
      });
      alert.present();
    } else {
      this._mealSvc.updateFavouriteMeal(this.meal);
      this.isDirty = true;
    }
  }

  ionViewCanLeave(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isDirty) {
        this._alertCtrl.create({
          title: 'Discard changes',
          message: 'Changes have been made. Are you sure you want to leave?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                resolve(true);
              }
            },
            {
              text: 'No',
              handler: () => {
                reject(true);
              }
            }
          ]
        }).present();
      } else {
        resolve(true);
      }
    });
  }
}
