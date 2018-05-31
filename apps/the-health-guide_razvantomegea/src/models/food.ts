import { Nutrition } from './nutrition';

export interface IFoodReportNutrient {
    group: string;
    nutrient_id: string | number;
    name: string;
    unit: string;
    value: string;
}

export interface IFoodReportSearchResult {
    ds: string;
    fg: string;
    ing: {desc: string, upd: string};
    name: string;
    ndbno: string;
    nutrients: Array<IFoodReportNutrient>;
}

export interface IFoodSearchResult {
    ds: string;
    group: string;
    name: string;
    ndbno: string;
}

export class FoodGroup {
    constructor(
        public id: string,
        public name: string
    ) { }
}

export class Food {
    constructor(
        public name: string = '',
        public ndbno: string = '',
        public group: string = '',
        public ingredients: string = '',
        public nutrition: Nutrition = new Nutrition(),
        public pral: number = 0,
        public quantity: number = 100,
        public servings: number = 1,
        public unit: string = 'g'
    ) { }
}