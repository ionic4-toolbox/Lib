// App
import { Component } from '@angular/core';
import { AlertController, InfiniteScroll, IonicPageMetadata, Loading, LoadingController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// Models
import { Recipe } from '../../models';

// Pages
import { RecipeDetailsPage } from '../recipe-details/recipe-details';

// Providers
import { RecipeService } from '../../providers';

@Component({
  selector: 'page-recipe-list',
  templateUrl: 'recipe-list.html'
})
export class RecipeListPage {
  private _recipesSubscription: Subscription;
  public detailsPage: IonicPageMetadata = RecipeDetailsPage;
  public limit: number = 50;
  public queryIngredients: Array<string> = [];
  public recipes: Array<Recipe> = [];
  public searchQuery: string = '';
  constructor(
    private _alertCtrl: AlertController,
    private _loadCtrl: LoadingController,
    private _navCtrl: NavController,
    private _recipeSvc: RecipeService,
  ) { }

  public addIngredientFilter(): void {
    this._alertCtrl.create({
      title: 'Filter by ingredients',
      subTitle: 'Tip: Try both singular and plural form',
      inputs: [
        {
          name: 'ingredient',
          placeholder: 'E.g. apples, bananas, strawberries, melon',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Done',
          handler: (data: { ingredient: string }) => {
            if (!this.queryIngredients.find((query: string) => query.toLocaleLowerCase().includes(data.ingredient.toLocaleLowerCase()))) {
              this.queryIngredients.push(data.ingredient);
              this.queryIngredients = [...this.queryIngredients];
            }
          }
        }
      ]
    }).present();
  }

  public addNewRecipe(): void {
    let newRecipe: Recipe = new Recipe();
    this._navCtrl.push(RecipeDetailsPage, { recipe: newRecipe, new: true });
  }

  public clearSearch(ev: string): void {
    this.searchQuery = '';
  }

  public loadMore(ev: InfiniteScroll) {
    this.limit += 50;
    setTimeout(() => {
      ev.complete();
    }, 1000);
  }

  public removeQueryIngredient(idx: number): void {
    this.queryIngredients = [...this.queryIngredients.slice(0, idx), ...this.queryIngredients.slice(idx + 1)];
  }

  public removeRecipe(recipe: Recipe): void {
    this._recipeSvc.removeRecipe(recipe);
  }

  ionViewWillEnter(): void {
    let loader: Loading = this._loadCtrl.create({
      content: 'Loading...',
      spinner: 'crescent',
      duration: 30000
    });

    loader.present();
    this._recipesSubscription = this._recipeSvc.getRecipes$().subscribe((recipes: Array<Recipe>) => {
      this.recipes = [...recipes];
      loader.dismissAll();
    });
  }

  ionViewWillLeave(): void {
    this._recipesSubscription.unsubscribe();
  }
}