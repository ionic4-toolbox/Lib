import { Injectable } from '@angular/core';

@Injectable()
export class DRIService {
  constructor() { }

  public getALADri(energyConsumption: number): number {
    return 0.005 * energyConsumption / 9;
  }

  public getAlcoholDri(age: number): number {
    return age > 18 ? 10 : 0;
  }

  public getBiotinDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.006;
    } else if (age <= 14) {
      return 0.02;
    } else if (gender === 'male') {
      return 0.03;
    } else {
      return lactating ? 0.035 : pregnant ? 0.03 : 0.03;
    }
  }

  public getCaffeine(age: number): number {
    return age > 14 ? 300 : 0;
  }

  public getCalciumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 260;
    } else if (age <= 14) {
      return 1000;
    } else if (gender === 'male') {
      return 1200;
    } else {
      return lactating ? 1300 : pregnant ? 1300 : 1200;
    }
  }

  public getCarbDri(energyConsumption: number): number {
    return 0.4 * energyConsumption / 4;
  }

  public getChlorideDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 250;
    } else if (age <= 14) {
      return 500;
    } else {
      return 800;
    }
  }

  public getCholineDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 150;
    } else if (age <= 14) {
      return 350;
    } else if (gender === 'male') {
      return 550;
    } else {
      return lactating ? 550 : pregnant ? 450 : 425;
    }
  }

  public getChromiumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.0055;
    } else if (age <= 14) {
      return 0.025;
    } else if (gender === 'male') {
      return 0.035;
    } else {
      return lactating ? 0.04 : pregnant ? 0.03 : 0.025;
    }
  }

  public getCobalaminDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.5;
    } else if (age <= 14) {
      return 1.8;
    } else if (gender === 'male') {
      return 2.4;
    } else {
      return lactating ? 2.8 : pregnant ? 2.6 : 2.4;
    }
  }

  public getCopperDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.22;
    } else if (age <= 14) {
      return 0.7;
    } else if (gender === 'male') {
      return 0.9;
    } else {
      return lactating ? 1.3 : pregnant ? 1 : 0.9;
    }
  }

  public getDHADri(energyConsumption: number): number {
    return 0.0025 * energyConsumption / 9;
  }

  public getEPADri(energyConsumption: number): number {
    return 0.0025 * energyConsumption / 9;
  }

  public getFatDri(energyConsumption: number): number {
    return 0.35 * energyConsumption / 9;
  }

  public getFiberDri(weight: number): number {
    return +weight;
  }

  public getFolicAcidDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 80;
    } else if (age <= 14) {
      return 300;
    } else if (gender === 'male') {
      return 400;
    } else {
      return lactating ? 600 : pregnant ? 800 : 400;
    }
  }

  public getHistidineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.036 * weight;
    } else if (age <= 14) {
      return 0.016 * weight;
    } else if (gender === 'male') {
      return 0.015 * weight;
    } else {
      return lactating ? 0.02 * weight : pregnant ? 0.02 * weight : 0.014 * weight;
    }
  }

  public getIodineDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.13;
    } else if (age <= 14) {
      return 0.13;
    } else if (gender === 'male') {
      return 0.15;
    } else {
      return lactating ? 0.29 : pregnant ? 0.22 : 0.15;
    }
  }

  public getIronDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 11;
    } else if (age <= 14) {
      return 10;
    } else if (gender === 'male') {
      return 8;
    } else {
      return lactating ? 15 : pregnant ? 27 : 10;
    }
  }

  public getIsoleucineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.043 * weight;
    } else if (age <= 14) {
      return 0.022 * weight;
    } else if (gender === 'male') {
      return 0.019 * weight;
    } else {
      return lactating ? 0.03 * weight : pregnant ? 0.025 * weight : 0.019 * weight;
    }
  }

  public getLADri(energyConsumption: number): number {
    return 0.005 * energyConsumption / 9;
  }

  public getLeucineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.093 * weight;
    } else if (age <= 14) {
      return 0.049 * weight;
    } else if (gender === 'male') {
      return 0.042 * weight;
    } else {
      return lactating ? 0.062 * weight : pregnant ? 0.056 * weight : 0.042 * weight;
    }
  }

  public getLysineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.089 * weight;
    } else if (age <= 14) {
      return 0.046 * weight;
    } else if (gender === 'male') {
      return 0.038 * weight;
    } else {
      return lactating ? 0.052 * weight : pregnant ? 0.051 * weight : 0.038 * weight;
    }
  }

  public getMagnesiumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 75;
    } else if (age <= 14) {
      return 240;
    } else if (gender === 'male') {
      return 420;
    } else {
      return lactating ? 310 : pregnant ? 350 : 320;
    }
  }

  public getManganeseDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.6;
    } else if (age <= 14) {
      return 1.5;
    } else if (gender === 'male') {
      return 2.3;
    } else {
      return lactating ? 2.6 : pregnant ? 2 : 1.8;
    }
  }

  public getMethionineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.043 * weight;
    } else if (age <= 14) {
      return 0.022 * weight;
    } else if (gender === 'male') {
      return 0.019 * weight;
    } else {
      return lactating ? 0.026 * weight : pregnant ? 0.025 * weight : 0.019 * weight;
    }
  }

  public getMolybdenumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.02;
    } else if (age <= 14) {
      return 0.04;
    } else if (gender === 'male') {
      return 0.045;
    } else {
      return lactating ? 0.05 : pregnant ? 0.05 : 0.045;
    }
  }

  public getNiacinDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 4;
    } else if (age <= 14) {
      return 12;
    } else if (gender === 'male') {
      return 16;
    } else {
      return lactating ? 17 : pregnant ? 18 : 14;
    }
  }

  public getPantothenicAcidDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 1.8;
    } else if (age <= 14) {
      return 3;
    } else if (gender === 'male') {
      return 5;
    } else {
      return lactating ? 7 : pregnant ? 6 : 5;
    }
  }

  public getPhenylalanineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.084 * weight;
    } else if (age <= 14) {
      return 0.041 * weight;
    } else if (gender === 'male') {
      return 0.033 * weight;
    } else {
      return lactating ? 0.051 * weight : pregnant ? 0.044 * weight : 0.033 * weight;
    }
  }

  public getPhosphorusDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 275;
    } else if (age <= 14) {
      return 500;
    } else {
      return 700;
    }
  }

  public getPotassiumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 700;
    } else if (age <= 14) {
      return 3800;
    } else if (gender === 'male') {
      return 4700;
    } else {
      return lactating ? 5100 : pregnant ? 4700 : 4700;
    }
  }

  public getProteinDri(energyConsumption: number): number {
    return 0.25 * energyConsumption / 4;
  }

  public getPyridoxineDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.3;
    } else if (age <= 14) {
      return 1;
    } else if (gender === 'male') {
      return 1.7;
    } else {
      return lactating ? 2 : pregnant ? 1.9 : 1.5;
    }
  }

  public getRiboflavinDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.4;
    } else if (age <= 14) {
      return 0.9;
    } else if (gender === 'male') {
      return 1.3;
    } else {
      return lactating ? 1.6 : pregnant ? 1.4 : 1.1;
    }
  }

  public getSeleniumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 20;
    } else if (age <= 14) {
      return 30;
    } else if (gender === 'male') {
      return 55;
    } else {
      return lactating ? 70 : pregnant ? 60 : 55;
    }
  }

  public getSodiumDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 500;
    } else if (age <= 14) {
      return 1000;
    } else {
      return 1500;
    }
  }

  public getSugarsDri(energyConsumption: number): number {
    return 0.1 * energyConsumption / 4;
  }

  public getThiamineDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 0.3;
    } else if (age <= 14) {
      return 0.9;
    } else if (gender === 'male') {
      return 1.2;
    } else {
      return lactating ? 1.4 : pregnant ? 1.4 : 1.1;
    }
  }

  public getThreonineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.049 * weight;
    } else if (age <= 14) {
      return 0.024 * weight;
    } else if (gender === 'male') {
      return 0.02 * weight;
    } else {
      return lactating ? 0.03 * weight : pregnant ? 0.026 * weight : 0.02 * weight;
    }
  }

  public getTransFatDri(energyConsumption: number): number {
    return 0.01 * energyConsumption / 9;
  }

  public getTryptophanDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.013 * weight;
    } else if (age <= 14) {
      return 0.006 * weight;
    } else if (gender === 'male') {
      return 0.005 * weight;
    } else {
      return lactating ? 0.009 * weight : pregnant ? 0.007 * weight : 0.005 * weight;
    }
  }

  public getValineDri(age: number, gender: string, lactating: boolean, pregnant: boolean, weight: number): number {
    if (age <= 1) {
      return 0.056 * weight;
    } else if (age <= 14) {
      return 0.028 * weight;
    } else if (gender === 'male') {
      return 0.024 * weight;
    } else {
      return lactating ? 0.035 * weight : pregnant ? 0.031 * weight : 0.024 * weight;
    }
  }

  public getVitaminADri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 500;
    } else if (age <= 14) {
      return 600;
    } else if (gender === 'male') {
      return 900;
    } else {
      return lactating ? 1300 : pregnant ? 770 : 700;
    }
  }

  public getVitaminCDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 50;
    } else if (age <= 14) {
      return 50;
    } else if (gender === 'male') {
      return 90;
    } else {
      return lactating ? 120 : pregnant ? 85 : 75;
    }
  }

  public getVitaminDDri(): number {
    return 5;
  }

  public getVitaminEDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 5;
    } else if (age <= 14) {
      return 11;
    } else {
      return 15;
    }
  }

  public getVitaminKDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 2.5;
    } else if (age <= 14) {
      return 60;
    } else if (gender === 'male') {
      return 120;
    } else {
      return 90;
    }
  }

  public getWater(energyConsumption: number): number {
    return energyConsumption;
  }

  public getZincDri(age: number, gender: string, lactating: boolean, pregnant: boolean): number {
    if (age <= 1) {
      return 2;
    } else if (age <= 14) {
      return 5;
    } else if (gender === 'male') {
      return 11;
    } else {
      return lactating ? 12 : pregnant ? 11 : 8;
    }
  }

}
