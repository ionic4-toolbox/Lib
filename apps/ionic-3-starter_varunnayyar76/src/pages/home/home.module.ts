import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage }						from './home';

import { ProductsProvider }				from '../../providers/products/products';
import { HeaderComponentModule }		from '../../components/header.module';

@NgModule({
	declarations: [
		HomePage
	],
	imports: [
		HeaderComponentModule,
		IonicPageModule.forChild(HomePage)
	],
	exports: [
		HomePage
	],
	providers: [
		ProductsProvider
	]
})
export class HomePageModule { }
