import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerListPage } from './speaker-list';

@NgModule({
  declarations: [
    SpeakerListPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerListPage),
  ],
})
export class SpeakerListPageModule {}
