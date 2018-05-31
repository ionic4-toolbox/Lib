import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SegmentsPage } from './segments';

@NgModule({
  declarations: [
    SegmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(SegmentsPage),
  ],
})
export class SegmentsPageModule {}
