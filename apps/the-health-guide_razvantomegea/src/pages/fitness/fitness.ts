// App
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

// Models
import { Fitness } from '../../models';

// Providers
import { FitnessService, NutritionService } from '../../providers';

@Component({
  selector: 'page-fitness',
  templateUrl: 'fitness.html'
})
export class FitnessPage {
  private _workEnergy: number;
  public age: AbstractControl;
  public gender: AbstractControl;
  public height: AbstractControl;
  public weight: AbstractControl;
  public fitness: Fitness;
  public fitnessDetails: string = 'fitness';
  public fitnessForm: FormGroup;
  public heartRate: number;
  public isDirty: boolean = false;
    public isFitness: boolean;
  constructor(
    private _alertCtrl: AlertController,
    private _formBuilder: FormBuilder,
    private _fitSvc: FitnessService,
    private _navCtrl: NavController,
    private _nutritionSvc: NutritionService,
    private _params: NavParams,
    private _toastCtrl: ToastController
  ) {
    if (!!_params.get('new')) {
      this._toastCtrl.create({
        message: 'Please complete the following form',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK'
      }).present();
    }
  }

  public saveFitness(): void {
    this.fitness.age = this.fitnessForm.get('age').value;
    this.fitness.gender = this.fitnessForm.get('gender').value;
    this.fitness.height = this.fitnessForm.get('height').value;
    this.fitness.heartRate.resting = this.fitnessForm.get('rhr').value;
    this.fitness.hips = this.fitnessForm.get('hips').value;
    this.fitness.lactating = this.fitnessForm.get('lactating').value;
    this.fitness.neck = this.fitnessForm.get('neck').value;
    this.fitness.pregnant = this.fitnessForm.get('pregnant').value;
    this.fitness.waist = this.fitnessForm.get('waist').value;
    this.fitness.weight = this.fitnessForm.get('weight').value;
    let energyConsumption = this._workEnergy + this.fitness.bmr,
      heartRateMax: number = this._fitSvc.calculateHRMax(this.fitness.age),
      thrRange: { min: number, max: number } = this._fitSvc.calculateTHR(heartRateMax, this.fitness.heartRate.resting);
    this.fitness = Object.assign({}, this.fitness, {
      bmr: this._fitSvc.calculateBmr(this.fitness.age, this.fitness.gender, this.fitness.height, this.fitness.weight),
      bodyFat: this._fitSvc.calculateBodyFat(this.fitness.age, this.fitness.gender, this.fitness.height, this.fitness.hips, this.fitness.neck, this.fitness.waist),
      heartRate: {
        max: heartRateMax,
        resting: this.fitness.heartRate.resting,
        trainingMin: thrRange.min,
        trainingMax: thrRange.max
      }
    });

    this.fitness.requirements = Object.assign({}, this._nutritionSvc.getDri(this.fitness.age, energyConsumption, this.fitness.gender, this.fitness.lactating, this.fitness.pregnant, this.fitness.weight));
    this._fitSvc.saveFitness(this.fitness);
    this._fitSvc.storeEnergyConsumption(energyConsumption);
    this.isFitness = this._fitSvc.getBodyFatFlag(this.fitness.bodyFat, this.fitness.gender);
    this.isDirty = false;
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

  ionViewWillEnter(): void {
    this.fitness = Object.assign({}, this._fitSvc.getFitness());
    this.fitnessForm = this._formBuilder.group({
      age: [this.fitness.age, Validators.required],
      gender: [this.fitness.gender, Validators.required],
      height: [this.fitness.height, Validators.required],
      hips: [this.fitness.hips],
      lactating: [this.fitness.lactating],
      neck: [this.fitness.neck],
      pregnant: [this.fitness.pregnant],
      rhr: [this.fitness.heartRate.resting],
      waist: [this.fitness.waist],
      weight: [this.fitness.weight, Validators.required]
    });

    this.age = this.fitnessForm.get('age');
    this.gender = this.fitnessForm.get('gender');
    this.height = this.fitnessForm.get('height');
    this.weight = this.fitnessForm.get('weight');
    this.fitnessForm.valueChanges.subscribe(() => this.isDirty = true);
    this._fitSvc.restoreEnergyConsumption().then((energyConsumption: number) => {
      this.fitness.requirements = Object.assign({}, this._nutritionSvc.getDri(this.fitness.age, (energyConsumption > 0) ? energyConsumption : this.fitness.bmr, this.fitness.gender, this.fitness.lactating, this.fitness.pregnant, this.fitness.weight));
      this._workEnergy = energyConsumption > 0 ? energyConsumption - this.fitness.bmr : 0;
    });

    this.isFitness = this._fitSvc.getBodyFatFlag(this.fitness.bodyFat, this.fitness.gender);
  }
}
