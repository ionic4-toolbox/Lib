import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChipPage } from './chip';

@NgModule({
  declarations: [
    ChipPage,
  ],
  imports: [
    IonicPageModule.forChild(ChipPage),
  ],
})
export class ChipPageModule {}
