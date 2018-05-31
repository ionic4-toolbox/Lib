import { Component } from '@angular/core';
import { WEIGHTS, WeightEntry } from '../../data/mock-data';

@Component({
	selector: 'weight-list',
	templateUrl: 'component.html'
})
export class WeightListComponent {

	weights: WeightEntry[];

	constructor() {
		this.weights = WEIGHTS;

		this.weights.forEach(element => {
			console.log(
				`
        date:  ${element.date}
        weight: ${element.weight}`
			);
		});
	}

}
