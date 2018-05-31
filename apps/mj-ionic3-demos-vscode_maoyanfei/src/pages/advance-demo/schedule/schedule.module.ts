import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';

import { ConferenceData } from '../../../providers/conference-data';
import { UserData } from '../../../providers/user-data';

//import { SessionDetailPage } from '../session-detail/session-detail';
//import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

@NgModule({
  declarations: [
    SchedulePage,
    //SessionDetailPage, 
    //ScheduleFilterPage
  ],
  imports: [
    //SessionDetailPage, 
    //ScheduleFilterPage,
    IonicPageModule.forChild(SchedulePage),
  ],
  providers: [
    ConferenceData, UserData,
  ]
})
export class SchedulePageModule {}
