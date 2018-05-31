import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroesDemoPage } from './heroes-demo';

@NgModule({
  declarations: [
    HeroesDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroesDemoPage),
  ],
})
export class HeroesDemoPageModule {}
