import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgePage } from './badge';

@NgModule({
  declarations: [
    BadgePage,
  ],
  imports: [
    IonicPageModule.forChild(BadgePage),
  ],
})
export class BadgePageModule {}
