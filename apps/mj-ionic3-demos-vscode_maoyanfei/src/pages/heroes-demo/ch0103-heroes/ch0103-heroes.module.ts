import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ch0103HeroesPage } from './ch0103-heroes';

@NgModule({
  declarations: [
    Ch0103HeroesPage,
  ],
  imports: [
    IonicPageModule.forChild(Ch0103HeroesPage),
  ],
})
export class Ch0103HeroesPageModule {}
