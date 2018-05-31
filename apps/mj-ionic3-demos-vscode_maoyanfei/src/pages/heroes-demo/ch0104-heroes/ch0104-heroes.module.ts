import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Ch0104HeroesPage } from './ch0104-heroes';

@NgModule({
  declarations: [
    Ch0104HeroesPage,
  ],
  imports: [
    IonicPageModule.forChild(Ch0104HeroesPage),
  ],
})
export class Ch0104HeroesPageModule {}
