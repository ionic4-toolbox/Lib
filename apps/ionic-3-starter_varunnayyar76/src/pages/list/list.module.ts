import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { HeaderComponentModule } from '../../components/header.module';

@NgModule({
	declarations: [
		ListPage
	],
	imports: [
		HeaderComponentModule,
		IonicPageModule.forChild(ListPage)
	],
	exports: [
		ListPage
	]
})
export class ListPageModule { }
