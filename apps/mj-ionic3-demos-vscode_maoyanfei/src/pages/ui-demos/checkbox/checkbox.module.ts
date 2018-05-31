import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckboxPage } from './checkbox';

@NgModule({
  declarations: [
    CheckboxPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckboxPage),
  ],
})
export class CheckboxPageModule {}
