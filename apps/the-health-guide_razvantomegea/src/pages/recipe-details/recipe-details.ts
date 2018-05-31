// App
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, Alert, AlertController, Modal, ModalController, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

// Models
import { Food, Recipe } from '../../models';

// Pages
import { FoodSelectPage } from '../food-select/food-select';

// Providers
import { NutritionService, PictureService, RecipeService } from '../../providers';

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage {
  @ViewChild('fileInput') fileInput;
  public cookingMethod: AbstractControl;
  public cookingTemperature: AbstractControl;
  public cookingTime: AbstractControl;
  public isDirty: boolean = false;
  public name: AbstractControl;
  public portions: AbstractControl;
  public recipe: Recipe;
  public recipeDetails: string = 'details';
  public recipeForm: FormGroup;
  public recipeInstructions: Array<string>;
  constructor(
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController,
    private _formBuilder: FormBuilder,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController,
    private _nutritionSvc: NutritionService,
    private _params: NavParams,
    private _picService: PictureService,
    private _recipeSvc: RecipeService,
    private _toastCtrl: ToastController
  ) {
    this.recipe = <Recipe>_params.get('recipe');
    this.recipe.ingredients = this.recipe.ingredients || [];
    this.recipe.instructions = this.recipe.instructions || [];
    this.recipeInstructions = [...this.recipe.instructions];
    this.recipeForm = _formBuilder.group({
      cookingMethod: [this.recipe.cookingMethod, Validators.required],
      cookingTemperature: [this.recipe.cookingTemperature, Validators.required],
      cookingTime: [this.recipe.cookingTime, Validators.required],
      image: [this.recipe.image, Validators.required],
      name: [this.recipe.name, Validators.required],
      portions: [this.recipe.portions, Validators.required]
    });

    this.cookingMethod = this.recipeForm.get('cookingMethod');
    this.cookingTemperature = this.recipeForm.get('cookingTemperature');
    this.cookingTime = this.recipeForm.get('cookingTime');
    this.name = this.recipeForm.get('name');
    this.portions = this.recipeForm.get('portions');
    this.recipeForm.valueChanges.subscribe(() => this.isDirty = true);
  }

  private _changeServings(item: Food | Recipe): void {
    let alert: Alert = this._alertCtrl.create({
      title: 'Servings',
      subTitle: `${item.name.toString()} (${item.quantity.toString()}${item.unit.toString()})`,
      inputs: [
        {
          name: 'servings',
          placeholder: 'Servings x 100g',
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
            this._updateRecipeDetails();
          }
        }
      ]
    });
    alert.present();
  }

  private _removeIngredient(idx: number): void {
    this.recipe.ingredients = [...this.recipe.ingredients.slice(0, idx), ...this.recipe.ingredients.slice(idx + 1)];
    this._updateRecipeDetails();
  }

  private _updateRecipeDetails(): void {
    this.isDirty = true;
    this.recipe.nutrition = this._recipeSvc.getRecipeNutrition(this.recipe.ingredients, this.recipe.portions);
    this._recipeSvc.checkCooking(this.recipe);
    this.recipe.pral = this._nutritionSvc.calculatePRAL(this.recipe.nutrition);
    this.recipe.quantity = this._recipeSvc.getRecipeSize(this.recipe.ingredients, this.recipe.portions);
    this.recipe.difficulty = this._recipeSvc.checkDifficulty(this.recipe);
  }

  public addIngredients(): void {
    let ingredientSelectModal: Modal = this._modalCtrl.create(FoodSelectPage);
    ingredientSelectModal.present();
    ingredientSelectModal.onDidDismiss((selection: Food | Recipe) => {
      if (!!selection) {
        this.recipe.ingredients = [...this.recipe.ingredients, selection];
        this._updateRecipeDetails();
      }
    });
  }

  public addInstruction(): void {
    this.recipe.instructions = [...this.recipe.instructions, ''];
    this.recipeInstructions = [...this.recipeInstructions, ''];
    this.isDirty = true;
  }

  public changeImage(): void {
    if (Camera['installed']()) {
      this._actionSheetCtrl.create({
        title: 'Change image',
        buttons: [
          {
            text: 'Take photo',
            handler: () => {
              this._picService.takePhoto().then((photoUri: string) => {
                this.recipe.image = photoUri;
                this.uploadImage();
              }).catch((err: Error) => this._alertCtrl.create({
                title: 'Uhh ohh...',
                subTitle: 'Something went wrong',
                message: err.toString(),
                buttons: ['OK']
              }).present());
            }
          }, {
            text: 'Choose image',
            handler: () => {
              this._picService.chooseImage().then((photoUri: string) => {
                this.recipe.image = photoUri;
                this.uploadImage();
              }).catch((err: Error) => this._alertCtrl.create({
                title: 'Uhh ohh...',
                subTitle: 'Something went wrong',
                message: err.toString(),
                buttons: ['OK']
              }).present());
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  public changePortions(): void {
    this.recipe.portions = this.recipeForm.get('portions').value;
    this.recipe.nutrition = this._recipeSvc.getRecipeNutrition(this.recipe.ingredients, this.recipe.portions);
    this.recipe.quantity = this._recipeSvc.getRecipeSize(this.recipe.ingredients, this.recipe.portions);
    this.isDirty = true;
  }

  public changeIngredient(idx: number): void {
    this._actionSheetCtrl.create({
      title: 'Change ingredient',
      buttons: [
        {
          text: 'Change servings',
          handler: () => {
            this._changeServings(this.recipe.ingredients[idx]);
          }
        }, {
          text: 'Remove item',
          handler: () => {
            this._removeIngredient(idx);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();
  }


  public processWebImage(event) {
    let reader: FileReader = new FileReader();
    reader.onload = (readerEvent: Event) => {
      this.uploadImage(event.target.files[0]);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  public removeInstruction(idx: number): void {
    this.recipe.instructions = [...this.recipe.instructions.slice(0, idx), ...this.recipe.instructions.slice(idx + 1)];
    this.recipeInstructions = [...this.recipeInstructions.slice(0, idx), ...this.recipeInstructions.slice(idx + 1)];
    this.isDirty = true;
  }

  public removeRecipe(): void {
    this._recipeSvc.removeRecipe(this.recipe);
    this._navCtrl.pop();
  }

  public saveRecipe(): void {
    this.recipe.instructions = [...this.recipeInstructions];
    this.recipe.cookingMethod = this.recipeForm.get('cookingMethod').value;
    this.recipe.cookingTemperature = this.recipeForm.get('cookingTemperature').value;
    this.recipe.cookingTime = this.recipeForm.get('cookingTime').value;
    this.recipe.name = this.recipeForm.get('name').value;
    this.recipe.portions = this.recipeForm.get('portions').value;
    this._updateRecipeDetails();
    this._recipeSvc.saveRecipe(this.recipe);
    this.isDirty = false;
  }

  public uploadImage(file?: File): void {
    let canceledUpload: boolean = false,
      toast: Toast = this._toastCtrl.create({
        message: 'Uploading ... 0%',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Cancel'
      });

    toast.present();
    toast.onWillDismiss(() => {
      canceledUpload = true;
      this._picService.cancelUpload();
    });

    this._picService.uploadImage('recipes', file).subscribe((data: string | number) => {
      if (typeof data === 'number') {
        toast.setMessage(`Uploading ... ${data}%`);
      } else {
        this.recipe.image = data;
        this.recipeForm.patchValue({ 'image': this.recipe.image });
        this.isDirty = true;
      }
    }, (err: Error) => {
      toast.setMessage('Uhh ohh, something went wrong!');
    },
      () => {
        if (canceledUpload === true) {
          this._toastCtrl.create({
            message: 'Upload canceled',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            duration: 10000
          }).present();
        } else {
          toast.dismissAll();
          this._toastCtrl.create({
            message: 'Upload complete!',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            duration: 10000
          }).present();
        }
      });
  }

  ionViewCanLeave(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!!this._params.get('new') && !this.isDirty) {
        resolve(true);
      } else if (this.isDirty) {
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
      } else if (this.recipe.ingredients.length === 0) {
        this._toastCtrl.create({
          message: 'Ingredients are required',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK',
          duration: 10000
        }).present();

        reject(true);
      } else if (this.recipe.instructions.length === 0) {
        this._toastCtrl.create({
          message: 'Instructions are required',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK',
          duration: 10000
        }).present();

        reject(true);
      } else if (this.recipeForm.invalid) {
        this._toastCtrl.create({
          message: 'Please complete all the recipe details',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK',
          duration: 10000
        }).present();

        reject(true);
      } else {
        resolve(true);
      }
    });
  }

  ionViewDidEnter(): void {
    if (!!this.recipe.image) {
      this._toastCtrl.create({
        message: 'Hint: Click the recipe image to change it',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK',
        duration: 10000
      }).present();
    }
  }
}

