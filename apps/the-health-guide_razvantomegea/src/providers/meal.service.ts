// App
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@ionic/cloud-angular';

// Third-party
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as moment from 'moment';
import * as _ from 'lodash';

// Models
import {
  Food,
  Meal,
  MealPlan,
  NutrientDeficiencies,
  NutrientExcesses,
  Recipe,
  WarningMessage
} from '../models';

// Providers
import { NutritionService } from './nutrition.service';

const CURRENT_DAY: number = moment().dayOfYear();

@Injectable()
export class MealService {
  private _currentMealPlan: FirebaseObjectObservable<MealPlan>;
  private _lastMealPlan: FirebaseObjectObservable<MealPlan>;
  private _favouriteMeals: FirebaseListObservable<Array<Meal>>;
  constructor(
    private _db: AngularFireDatabase,
    private _nutritionSvc: NutritionService,
    private _user: User
  ) {
    this._currentMealPlan = _db.object(`/meal-plans/${_user.id}/${CURRENT_DAY}`);
    this._lastMealPlan = _db.object(`/meal-plans/${_user.id}/${CURRENT_DAY - 1}`);
    this._favouriteMeals = _db.list(`/favourite-meals/${_user.id}`);
  }

  private _checkMealPral(pral: number): WarningMessage {
    return pral >= 1 ? new WarningMessage(
      'The meal is acid forming',
      'Acid forming food and meals cause inflammation, which is the root of all diseases. Try adding some alkaline forming foods, like green vegetables, with PRAL below 0'
    ) : null;
  }

  private _checkMealSize(size: number): WarningMessage {
    return size > 1000 ? new WarningMessage(
      'The meal is too large!',
      "The meal most not exceed the stomach's capacity of 1000 g"
    ) : null;
  }

  public calculatePRAL(foods: Array<Food | Recipe>): number {
    return foods.reduce((acc: number, currFood: Food) => acc += (currFood.pral * currFood.servings), 0);
  }

  public calculatePRALDaily(meals: Array<Meal>): number {
    return meals.reduce((acc: number, currMeal: Meal) => acc += currMeal.pral, 0);
  }

  public calculateOmega36RatioDaily(meals: Array<Meal>): number {
    let omega3: number = 0,
      omega6: number = 0;
    meals.forEach((meal: Meal) => {
      omega3 += meal.nutrition.ala.value;
      omega6 += meal.nutrition.la.value;
    });

    return +((omega3 || 1) / (omega6 || 1)).toFixed(2)
  }

  public checkMeal(meal: Meal): void {
    meal.warnings = _.compact([
      ...this._nutritionSvc.checkNutrition(meal.nutrition),
      this._checkMealPral(meal.pral),
      this._checkMealSize(meal.quantity)
    ]);
  }

  public getMealPlan$(): Observable<MealPlan> {
    return new Observable((observer: Observer<MealPlan>) => {
      this._currentMealPlan.subscribe((currMealPlan: MealPlan) => {
        if (currMealPlan['$value'] === null) {
          currMealPlan = new MealPlan();

          //Get the previous day meal plan to check for deficiencies and excesses
          let lastMealPlanSubscription: Subscription = this._lastMealPlan.subscribe((lastMealPlan: MealPlan) => {
            if (!lastMealPlan.hasOwnProperty('$value')) {
              let prevDeficiencies: NutrientDeficiencies = this._nutritionSvc.findDeficiencies(lastMealPlan.dailyNutrition),
                prevExcesses: NutrientExcesses = this._nutritionSvc.findExcesses(lastMealPlan.dailyNutrition);
              for (let nutrientKey in prevDeficiencies) {
                currMealPlan.deficiency[nutrientKey] = prevDeficiencies[nutrientKey] === 1 ? prevDeficiencies[nutrientKey] + lastMealPlan.deficiency[nutrientKey] : 0;
                if (currMealPlan.deficiency[nutrientKey] > 2) {
                  currMealPlan.warnings = [...currMealPlan.warnings, new WarningMessage(
                    `${currMealPlan.dailyNutrition[nutrientKey].name} deficiency`,
                    `${currMealPlan.deficiency[nutrientKey]} days of deficiency`
                  )];
                }
              }

              for (let nutrientKey in prevExcesses) {
                currMealPlan.excess[nutrientKey] = prevExcesses[nutrientKey] === 1 ? prevExcesses[nutrientKey] + lastMealPlan.excess[nutrientKey] : 0;
                if (currMealPlan.excess[nutrientKey] > 2) {
                  currMealPlan.warnings = [...currMealPlan.warnings, new WarningMessage(
                    `${currMealPlan.dailyNutrition[nutrientKey].name} excess`,
                    `${currMealPlan.excess[nutrientKey]} days of excess`
                  )];
                }
              }
            }
            this._currentMealPlan.set(currMealPlan);
            lastMealPlanSubscription.unsubscribe();
          });
        } else {
          // Firebase removes empty objects on save
          currMealPlan.warnings = currMealPlan.warnings || [];
          currMealPlan.meals = currMealPlan.meals || [];
          observer.next(currMealPlan);
        }
      });
    });
  }

  public getFavouriteMeals$(): FirebaseListObservable<Array<Meal>> {
    return this._favouriteMeals;
  }

  public saveMealPlan(mealPlan: MealPlan): void {
    mealPlan.dailyNutrition = this._nutritionSvc.calculateNutritionPercent(mealPlan.meals, true);
    mealPlan.omega36Ratio = this.calculateOmega36RatioDaily(mealPlan.meals);
    mealPlan.pral = this.calculatePRALDaily(mealPlan.meals);
    this._currentMealPlan.update({
      dailyNutrition: mealPlan.dailyNutrition,
      date: mealPlan.date,
      deficiency: mealPlan.deficiency,
      excess: mealPlan.excess,
      meals: mealPlan.meals,
      omega36Ratio: mealPlan.omega36Ratio,
      pral: mealPlan.pral,
      warnings: mealPlan.warnings
    });
  }

  public sortMeals(meals: Array<Meal>): Array<Meal> {
    return _.sortBy(meals, (meal: Meal) => meal.time);
  }

  public updateFavouriteMeal(meal: Meal): void {
    if (meal.favourite && meal.favouriteKey === '') {
      // Meal is not added to favourites
      meal.favouriteKey = this._favouriteMeals.push(meal).key;
    } else if (!meal.favourite) {
      // Meal is no longer favourite
      meal.favouriteName = '';
      this._favouriteMeals.remove(meal.favouriteKey);
      meal.favouriteKey = '';
    } else {
      // Meal already is favourite
      this._favouriteMeals.update(meal['favouriteKey'], {
        favouriteName: meal.favouriteName,
        mealItems: meal.mealItems || [],
        nutrition: meal.nutrition,
        pral: meal.pral,
        quantity: meal.quantity,
        warnings: meal.warnings || []
      });
    }
  }
}