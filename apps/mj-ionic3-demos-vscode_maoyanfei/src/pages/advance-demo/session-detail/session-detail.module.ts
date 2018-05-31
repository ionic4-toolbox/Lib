import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionDetailPage } from './session-detail';

@NgModule({
  declarations: [
    SessionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionDetailPage),
  ],
  entryComponents: [
    SessionDetailPage
  ]
})
export class SessionDetailPageModule {}