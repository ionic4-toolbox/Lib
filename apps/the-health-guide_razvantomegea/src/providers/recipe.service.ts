// App
import { Injectable } from '@angular/core';
import { User } from '@ionic/cloud-angular';

// Third-party
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Models
import {
  Food,
  Nutrition,
  Recipe
} from '../models';

// Providers
import { FoodService } from './food.service';
import { NutritionService } from './nutrition.service';

@Injectable()
export class RecipeService {
  private _recipes: FirebaseListObservable<Array<Recipe>>;
  constructor(
    private _db: AngularFireDatabase,
    private _foodSvc: FoodService,
    private _nutritionSvc: NutritionService,
    private _user: User
  ) {
    this._recipes = _db.list(`/recipes/${_user.id}`, {
      query: {
        orderByChild: 'name'
      }
    });
  }

  public checkCooking(recipe: Recipe): void {
    if (recipe.cookingMethod === 'Baking' || recipe.cookingMethod === 'Grilling' || recipe.cookingMethod === 'Roasting' || recipe.cookingMethod === 'Steaming') {
      // Dry heat cooking
      recipe.nutrition.ala.value *= 0.75;
      recipe.nutrition.choline.value *= 0.1;
      recipe.nutrition.dha.value *= 0.75;
      recipe.nutrition.epa.value *= 0.75;
      recipe.nutrition.la.value *= 0.75;
      recipe.nutrition.vitaminA.value *= 0.5;
      recipe.nutrition.vitaminB1.value *= 0.3;
      recipe.nutrition.vitaminB2.value *= 0.1;
      recipe.nutrition.vitaminB3.value *= 0.1;
      recipe.nutrition.vitaminB5.value *= 0.1;
      recipe.nutrition.vitaminB6.value *= 0.1;
      recipe.nutrition.vitaminB9.value *= 0.1;
      recipe.nutrition.vitaminC.value *= 0.8;
      recipe.nutrition.vitaminD.value *= 0.5;
      recipe.nutrition.vitaminE.value *= 0.5;
      recipe.nutrition.vitaminK.value *= 0.5;
    } else if (recipe.cookingMethod === 'Frying' || recipe.cookingMethod === 'Stewing') {
      // Moist cooking
      recipe.nutrition.ala.value *= 0.75;
      recipe.nutrition.calcium.value *= 0.2;
      recipe.nutrition.choline.value *= 0.7;
      recipe.nutrition.copper.value *= 0.4;
      recipe.nutrition.dha.value *= 0.75;
      recipe.nutrition.epa.value *= 0.75;
      recipe.nutrition.iron.value *= 0.35;
      recipe.nutrition.la.value *= 0.75;
      recipe.nutrition.magnesium.value *= 0.25;
      recipe.nutrition.manganese.value *= 0.25;
      recipe.nutrition.phosphorus.value *= 0.25;
      recipe.nutrition.potassium.value *= 0.3;
      recipe.nutrition.selenium.value *= 0.25;
      recipe.nutrition.vitaminA.value *= 0.25;
      recipe.nutrition.vitaminB1.value *= 0.55;
      recipe.nutrition.vitaminB2.value *= 0.25;
      recipe.nutrition.vitaminB3.value *= 0.4;
      recipe.nutrition.vitaminB5.value *= 0.5;
      recipe.nutrition.vitaminB6.value *= 0.4;
      recipe.nutrition.vitaminB9.value *= 0.7;
      recipe.nutrition.vitaminB12.value *= 0.45;
      recipe.nutrition.vitaminC.value *= 0.5;
      recipe.nutrition.vitaminD.value *= 0.25;
      recipe.nutrition.vitaminE.value *= 0.25;
      recipe.nutrition.vitaminK.value *= 0.25;
      recipe.nutrition.zinc.value *= 0.25;
    } else if (recipe.cookingMethod === 'Boiling') {
      // Cooking and draining the water
      recipe.nutrition.ala.value *= 0.75;
      recipe.nutrition.calcium.value *= 0.25;
      recipe.nutrition.choline.value *= 0.75;
      recipe.nutrition.copper.value *= 0.45;
      recipe.nutrition.dha.value *= 0.75;
      recipe.nutrition.epa.value *= 0.75;
      recipe.nutrition.iron.value *= 0.4;
      recipe.nutrition.la.value *= 0.75;
      recipe.nutrition.magnesium.value *= 0.4;
      recipe.nutrition.manganese.value *= 0.4;
      recipe.nutrition.phosphorus.value *= 0.35;
      recipe.nutrition.potassium.value *= 0.7;
      recipe.nutrition.selenium.value *= 0.4;
      recipe.nutrition.vitaminA.value *= 0.35;
      recipe.nutrition.vitaminB1.value *= 0.7;
      recipe.nutrition.vitaminB2.value *= 0.45;
      recipe.nutrition.vitaminB3.value *= 0.55;
      recipe.nutrition.vitaminB5.value *= 0.7;
      recipe.nutrition.vitaminB6.value *= 0.65;
      recipe.nutrition.vitaminB9.value *= 0.75;
      recipe.nutrition.vitaminB12.value *= 0.5;
      recipe.nutrition.vitaminC.value *= 0.75;
      recipe.nutrition.vitaminD.value *= 0.35;
      recipe.nutrition.vitaminE.value *= 0.35;
      recipe.nutrition.vitaminK.value *= 0.35;
      recipe.nutrition.zinc.value *= 0.4;
    }
  }

  public checkDifficulty(recipe: Recipe): number {
    return recipe.instructions.length < 5 ? 1 : recipe.instructions.length < 10 ? 2 : 3;
  }
  
  public getRecipeNutrition(items: Array<Food | Recipe>, portions: number): Nutrition {
    let totalNutrition: Nutrition = this._nutritionSvc.calculateNutrition(items),
      portionNutrition: Nutrition = new Nutrition();
    for (let nutrientKey in totalNutrition) {
      portionNutrition[nutrientKey].value = totalNutrition[nutrientKey].value / portions;
      portionNutrition[nutrientKey].value = +(portionNutrition[nutrientKey].value).toFixed(2);
    }

    return portionNutrition;
  }

  public getRecipes$(): FirebaseListObservable<Array<Recipe>> {
    return this._recipes;
  }

  public getRecipeSize(items: Array<Food | Recipe>, portions: number): number {
    return Math.round(this._nutritionSvc.calculateQuantity(items) / portions);
  }

  public removeRecipe(recipe: Recipe): void {
    this._recipes.remove(recipe['$key']);
  }

  public saveRecipe(recipe: Recipe): void {
    let { image, name, username } = this._user.details;
    recipe.chef = username || name;
    recipe.chefAvatar = image;
    if (!recipe.hasOwnProperty('$key')) {
      recipe['$key'] = this._recipes.push(recipe).key;
    } else {
      this._recipes.update(recipe['$key'], {
        chef: recipe.chef,
        chefAvatar: recipe.chefAvatar,
        cookingMethod: recipe.cookingMethod,
        cookingTemperature: recipe.cookingTemperature,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        image: recipe.image,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        name: recipe.name,
        nutrition: recipe.nutrition,
        portions: recipe.portions,
        pral: recipe.pral,
        quantity: recipe.quantity,
        servings: recipe.servings
      });
    }
  }
}
