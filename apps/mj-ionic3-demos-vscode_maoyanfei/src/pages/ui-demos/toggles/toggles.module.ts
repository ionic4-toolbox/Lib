import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TogglesPage } from './toggles';

@NgModule({
  declarations: [
    TogglesPage,
  ],
  imports: [
    IonicPageModule.forChild(TogglesPage),
  ],
})
export class TogglesPageModule {}
