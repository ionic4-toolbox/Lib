import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleFilterPage } from './schedule-filter';

@NgModule({
  declarations: [
    ScheduleFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleFilterPage),
  ],
})
export class ScheduleFilterPageModule {}
