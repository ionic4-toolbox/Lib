// App
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '@ionic/cloud-angular';

// Third-party
import * as moment from 'moment';

// Models
import { Nutrition, Fitness } from '../models';

const CURRENT_DAY: number = moment().dayOfYear();

@Injectable()
export class FitnessService {
  constructor(private _storage: Storage, private _user: User) { }

  private _calculateTHRMax(hrMax: number, hrRest: number): number {
    return Math.round(0.85 * (hrMax - hrRest) + hrRest);
  }

  private _calculateTHRMin(hrMax: number, hrRest: number): number {
    return Math.round(0.5 * (hrMax - hrRest) + hrRest);
  }

  /**
   * The Revised Harris-Benedict Equation
   */
  public calculateBmr(age: number, gender: string, height: number, weight: number): number {
    if (gender === 'male') {
      return Math.round(13.397 * weight + 4.799 * height - 5.677 * age + 88.362);
    } else {
      return Math.round(9.247 * weight + 3.098 * height - 4.33 * age + 447.593);
    }
  }

  /**
   * The U.S. Navy body fat equations developed by Drs. Hodgdon and Beckett at the Naval Health Research Center
   */
  public calculateBodyFat(age: number, gender: string, height: number, hips: number, neck: number, waist: number): number {
    if (gender === 'male') {
      return +(495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450).toFixed(2);
    } else {
      return +(495 / (1.29579 - 0.35004 * Math.log10(waist + hips - neck) + 0.221 * Math.log10(height)) - 450).toFixed(2);
    }
  }

  /**
   * Nes, B.M, et al. HRMax formula
   */
  public calculateHRMax(age: number): number {
    return Math.round(211 - (0.64 * age));
  }

  /**
  * Calculates the heart tThe Karvonen method
  */
  public calculateTHR(hrMax: number, hrRest: number): { min: number, max: number } {
    return {
      min: this._calculateTHRMin(+hrMax, +hrRest),
      max: this._calculateTHRMax(+hrMax, +hrRest)
    };
  }

  public getBodyFatFlag(fatPercentage: number, gender: string): boolean {
    if (gender === 'male') {
      return fatPercentage <= 17;
    } else {
      return fatPercentage <= 24;
    }
  }

  public getFitness(): Fitness {
    return <Fitness>this._user.get('fitness', new Fitness());
  }

  public getUserRequirements(): Nutrition {
    return <Nutrition>this.getFitness().requirements;
  }

  public getUserWeight(): number {
    return <number>this.getFitness().weight;
  }

  public restoreEnergyConsumption(): Promise<number> {
    return new Promise(resolve => {
      this._storage.ready().then(() => this._storage.get('energyConsumption').then((energy: { date: number, consumption: number }) => {
        if (!!energy && energy.date === CURRENT_DAY) {
          resolve(energy.consumption);
        } else {
          resolve(0);
        }
      }));
    });
  }

  public restoreEnergyIntake(): Promise<number> {
    return new Promise(resolve => {
      this._storage.ready().then(() => this._storage.get('energyIntake').then((energy: { date: number, intake: number }) => {
        if (!!energy && energy.date === CURRENT_DAY) {
          resolve(energy.intake);
        } else {
          resolve(0);
        }
      }));
    });
  }

  public saveFitness(fitness: Fitness): void {
    this._user.set('fitness', fitness);
    this._user.save();
  }

  public storeEnergyConsumption(energyConsumption: number): void {
    this._storage.ready().then(() => this._storage.set('energyConsumption', { date: CURRENT_DAY, consumption: energyConsumption }));
  }

  public storeEnergyIntake(energyIntake: number): void {
    this._storage.ready().then(() => this._storage.set('energyIntake', { date: CURRENT_DAY, intake: energyIntake }));
  }
}
