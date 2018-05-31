import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'page.html'
})
export class HomePage {
	app_title: string;

	constructor(public navCtrl: NavController) {
		this.app_title = 'Weight Tracker';
	}

}
