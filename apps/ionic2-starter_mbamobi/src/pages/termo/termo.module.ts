import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermoPage } from './termo';

@NgModule({
  declarations: [
    TermoPage
  ],
  imports: [
    IonicPageModule.forChild(TermoPage)
  ],
  exports: [
    TermoPage
  ]
})
export class TermoModule {}
