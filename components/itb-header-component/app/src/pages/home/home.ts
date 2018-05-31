import { Component }					from '@angular/core';
import { NavController }				from 'ionic-angular';

import { ComponentsModule }				from './../../components/components.module';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public title: string;

	constructor(public navCtrl: NavController) {
		this.title = 'Home Tab'; //this.navParams.get('title');
	}

}
