import { Component }					from '@angular/core';

@Component({
	selector: 'custom-div',
	templateUrl: 'custom.html'
})
export class CustomComponent {

	text: string;

	constructor() {
		this.text = 'Hello, CustomComponent World';
	}
}
