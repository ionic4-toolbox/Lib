// Models
import { Food } from './food';
import { Nutrition } from './nutrition';

export class Recipe {
    constructor(
        public chef: string = '',
        public chefAvatar: string = '',
        public cookingMethod: string = '',
        public cookingTemperature: number = 0,
        public cookingTime: number = 0,
        public difficulty: number = 1,
        public image: string = '',
        public ingredients: Array<Food | Recipe> = [],
        public instructions: Array<string> = [],
        public name: string = '',
        public nutrition: Nutrition = new Nutrition(),
        public portions: number = 1,
        public pral: number = 0,
        public quantity: number = 0,
        public servings: number = 1,
        public unit: string = 'g'
    ) {}
}