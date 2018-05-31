import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RangesPage } from './ranges';

@NgModule({
  declarations: [
    RangesPage,
  ],
  imports: [
    IonicPageModule.forChild(RangesPage),
  ],
})
export class RangesPageModule {}
