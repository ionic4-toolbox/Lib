import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PopoverPage } from './about-popover';

@NgModule({
  declarations: [
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(PopoverPage),
  ],
})
export class PopoverPageModule {}
