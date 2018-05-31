// Third-party
import * as moment from 'moment';

// Models
import { Food } from './food';
import { NutrientDeficiencies, NutrientExcesses, Nutrition } from './nutrition';
import { Recipe } from './recipe';
import { WarningMessage } from './warning-message';

export class Meal {
    constructor(
        public favourite: boolean = false,
        public favouriteKey: string = '',
        public favouriteName: string = '',
        public mealItems: Array<Food | Recipe> = [],
        public nutrition: Nutrition = new Nutrition(),
        public pral: number = 0,
        public quantity: number = 0,
        public time: string = moment().format('HH:mm'),
        public warnings: Array<WarningMessage> = []
    ) { }
}

export class MealPlan {
    constructor(
        public dailyNutrition: Nutrition = new Nutrition(),
        public date: number = moment().dayOfYear(),
        public deficiency: NutrientDeficiencies = new NutrientDeficiencies(),
        public excess: NutrientExcesses = new NutrientExcesses(),
        public meals: Array<Meal> = [],
        public omega36Ratio: number = 0,
        public pral: number = 0,
        public warnings: Array<WarningMessage> = []
    ) { }
}