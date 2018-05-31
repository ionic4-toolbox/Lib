// App
import { Injectable } from '@angular/core';

// Third-party
import * as _ from 'lodash';

// Models
import { Food, Meal, Nutrition, NutrientDeficiencies, NutrientExcesses, Recipe, WarningMessage } from '../models';

// Providers
import { DRIService } from './dri.service';
import { FitnessService } from './fitness.service';

@Injectable()
export class NutritionService {
  constructor(
    private _driSvc: DRIService,
    private _fitSvc: FitnessService
  ) { }

  private _checkExcessAlcohol(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.alcohol.value > requirements.alcohol.value ? new WarningMessage(
      'Too much alcohol',
      `Your daily requirements are ${Math.round(requirements.alcohol.value)}${requirements.alcohol.unit} of alcohol`
    ) : null;
  }

  private _checkExcessCaffeine(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.caffeine.value > requirements.caffeine.value ? new WarningMessage(
      'Too much caffeine',
      `Your daily requirements are ${Math.round(requirements.caffeine.value)}${requirements.caffeine.unit} of caffeine`
    ) : null;
  }

  private _checkExcessCarbs(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.carbs.value > requirements.carbs.value ? new WarningMessage(
      'Too much carbohydrates',
      `Your daily requirements are ${Math.round(requirements.carbs.value)}${requirements.carbs.unit} of carbohydrates`
    ) : null;
  }

  private _checkExcessEnergy(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.energy.value > requirements.energy.value ? new WarningMessage(
      'Too much energy',
      `Your daily requirements are ${Math.round(requirements.energy.value)}${requirements.energy.unit} of energy`
    ) : null;
  }

  private _checkExcessSugars(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.sugars.value > requirements.sugars.value ? new WarningMessage(
      'Too much sugars',
      `Your daily requirements are ${Math.round(requirements.sugars.value)}${requirements.sugars.unit} of sugars`
    ) : null;
  }

  private _checkExcessTransFat(nutrition: Nutrition, requirements: Nutrition): WarningMessage {
    return nutrition.transFat.value > requirements.transFat.value ? new WarningMessage(
      'Too much trans fat',
      `Your daily requirements are ${Math.round(requirements.transFat.value)}${requirements.transFat.unit} of trans fat`
    ) : null;
  }

  /**
   * Calculates the total nutritional values of an amount of foods based on their servings
   */
  public calculateNutrition(items: Array<Food | Meal | Recipe>, preserveEnergy: boolean = false): Nutrition {
    let nutrition: Nutrition = new Nutrition();
    items.forEach((item: Food) => {
      // Sum the nutrients for each meal item
      for (let nutrientKey in nutrition) {
        nutrition[nutrientKey].value += (item.nutrition[nutrientKey].value * item.servings);
        nutrition[nutrientKey].value = +(nutrition[nutrientKey].value).toFixed(2);
      }
    });

    return nutrition;
  }

  /**
   * Calculates the daily nutrition intake percentage of the daily requirements
   */
  public calculateNutritionPercent(items: Array<Food | Meal>, preserveEnergy: boolean = false): Nutrition {
    let nutrition: Nutrition = new Nutrition(),
      requirements: Nutrition = this._fitSvc.getUserRequirements();
    items.forEach((item: Food) => {
      // Sum the nutrients for each item
      for (let nutrientKey in requirements) {
        nutrition[nutrientKey].value += item.nutrition[nutrientKey].value;
      }
    });

    // Save the energy intake to calculate the left energy in activity plan
    if (preserveEnergy) {
      this._fitSvc.storeEnergyIntake(nutrition.energy.value);
    }

    // Establish the meal's nutritional value, based on the user's nutritional requirements (%)
    for (let nutrientKey in nutrition) {
      nutrition[nutrientKey].value = Math.round((nutrition[nutrientKey].value * 100) / (requirements[nutrientKey].value || 1));
    }

    return nutrition;
  }

  public calculateOmega36Ratio(nutrition: Nutrition): number {
    return +((nutrition.ala.value || 1) / (nutrition.la.value || 1)).toFixed(2);
  }

  /**
   * The PRAL formula designed by Dr. Thomas Remer
   */
  public calculatePRAL(nutrition: Nutrition): number {
    return +(0.49 * nutrition.protein.value + 0.037 * nutrition.phosphorus.value - 0.021 * nutrition.potassium.value - 0.026 * nutrition.magnesium.value - 0.013 * nutrition.calcium.value).toFixed(2);
  }

  public calculateQuantity(items: Array<Food | Recipe>): number {
    return items.reduce((acc: number, item: Food) => acc + (item.quantity * item.servings), 0);
  }

  public checkNutrition(nutrition: Nutrition): Array<WarningMessage> {
    let requirements: Nutrition = this._fitSvc.getUserRequirements()
    return _.compact([
      this._checkExcessAlcohol(nutrition, requirements),
      this._checkExcessCaffeine(nutrition, requirements),
      this._checkExcessCarbs(nutrition, requirements),
      this._checkExcessEnergy(nutrition, requirements),
      this._checkExcessSugars(nutrition, requirements),
      this._checkExcessTransFat(nutrition, requirements)
    ]);
  }

  public findDeficiencies(nutrition: Nutrition): NutrientDeficiencies {
    let deficiencies: NutrientDeficiencies = new NutrientDeficiencies();
    for (let nutrientKey in deficiencies) {
      if (nutrition[nutrientKey].value < 75) {
        deficiencies[nutrientKey]++;
      }
    }

    return deficiencies;
  }

  public findExcesses(nutrition: Nutrition): NutrientExcesses {
    let excesses: NutrientExcesses = new NutrientExcesses();
    for (let nutrientKey in excesses) {
      if (nutrition[nutrientKey].value > 100) {
        excesses[nutrientKey]++;
      }
    }

    return excesses;
  }

  public getDri(age: number, energyConsumption: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): Nutrition {
    let requirements: Nutrition = new Nutrition();
    requirements.ala.value = this._driSvc.getALADri(energyConsumption);
    requirements.alcohol.value = this._driSvc.getAlcoholDri(age);
    requirements.caffeine.value = this._driSvc.getCaffeine(age);
    requirements.calcium.value = this._driSvc.getCalciumDri(age, gender, lactating, pregnant);
    requirements.carbs.value = this._driSvc.getCarbDri(energyConsumption);
    requirements.choline.value = this._driSvc.getCholineDri(age, gender, lactating, pregnant);
    requirements.copper.value = this._driSvc.getCopperDri(age, gender, lactating, pregnant);
    requirements.dha.value = this._driSvc.getDHADri(energyConsumption);
    requirements.energy.value = energyConsumption;
    requirements.epa.value = this._driSvc.getEPADri(energyConsumption);
    requirements.fats.value = this._driSvc.getFatDri(energyConsumption);
    requirements.fiber.value = this._driSvc.getFiberDri(weight);
    requirements.histidine.value = this._driSvc.getHistidineDri(age, gender, lactating, pregnant, weight);
    requirements.iron.value = this._driSvc.getIronDri(age, gender, lactating, pregnant);
    requirements.isoleucine.value = this._driSvc.getIsoleucineDri(age, gender, lactating, pregnant, weight);
    requirements.la.value = this._driSvc.getLADri(energyConsumption);
    requirements.leucine.value = this._driSvc.getLeucineDri(age, gender, lactating, pregnant, weight);
    requirements.lysine.value = this._driSvc.getLysineDri(age, gender, lactating, pregnant, weight);
    requirements.magnesium.value = this._driSvc.getMagnesiumDri(age, gender, lactating, pregnant);
    requirements.manganese.value = this._driSvc.getManganeseDri(age, gender, lactating, pregnant);
    requirements.methionine.value = this._driSvc.getMethionineDri(age, gender, lactating, pregnant, weight);
    requirements.phenylalanine.value = this._driSvc.getPhenylalanineDri(age, gender, lactating, pregnant, weight);
    requirements.phosphorus.value = this._driSvc.getPhosphorusDri(age, gender, lactating, pregnant);
    requirements.potassium.value = this._driSvc.getPotassiumDri(age, gender, lactating, pregnant);
    requirements.protein.value = this._driSvc.getProteinDri(energyConsumption);
    requirements.selenium.value = this._driSvc.getSeleniumDri(age, gender, lactating, pregnant);
    requirements.sodium.value = this._driSvc.getSodiumDri(age, gender, lactating, pregnant);
    requirements.sugars.value = this._driSvc.getSugarsDri(energyConsumption);
    requirements.threonine.value = this._driSvc.getThreonineDri(age, gender, lactating, pregnant, weight);
    requirements.transFat.value = this._driSvc.getTransFatDri(energyConsumption);
    requirements.tryptophan.value = this._driSvc.getTryptophanDri(age, gender, lactating, pregnant, weight);
    requirements.valine.value = this._driSvc.getValineDri(age, gender, lactating, pregnant, weight);
    requirements.vitaminA.value = this._driSvc.getVitaminADri(age, gender, lactating, pregnant);
    requirements.vitaminB1.value = this._driSvc.getThiamineDri(age, gender, lactating, pregnant);
    requirements.vitaminB2.value = this._driSvc.getRiboflavinDri(age, gender, lactating, pregnant);
    requirements.vitaminB3.value = this._driSvc.getNiacinDri(age, gender, lactating, pregnant);
    requirements.vitaminB5.value = this._driSvc.getPantothenicAcidDri(age, gender, lactating, pregnant);
    requirements.vitaminB6.value = this._driSvc.getRiboflavinDri(age, gender, lactating, pregnant);
    requirements.vitaminB9.value = this._driSvc.getFolicAcidDri(age, gender, lactating, pregnant);
    requirements.vitaminB12.value = this._driSvc.getCobalaminDri(age, gender, lactating, pregnant);
    requirements.vitaminC.value = this._driSvc.getVitaminCDri(age, gender, lactating, pregnant);
    requirements.vitaminD.value = this._driSvc.getVitaminDDri();
    requirements.vitaminE.value = this._driSvc.getVitaminEDri(age, gender, lactating, pregnant);
    requirements.vitaminK.value = this._driSvc.getVitaminKDri(age, gender, lactating, pregnant);
    requirements.water.value = this._driSvc.getWater(energyConsumption);
    requirements.zinc.value = this._driSvc.getZincDri(age, gender, lactating, pregnant);

    return requirements;
  }
}
