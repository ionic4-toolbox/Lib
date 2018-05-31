import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UiDemosPage } from './ui-demos';

@NgModule({
  declarations: [
    UiDemosPage,
  ],
  imports: [
    IonicPageModule.forChild(UiDemosPage),
  ],
})
export class UiDemosPageModule {}
