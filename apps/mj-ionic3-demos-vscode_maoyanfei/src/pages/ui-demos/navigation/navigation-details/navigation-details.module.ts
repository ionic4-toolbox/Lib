import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigationDetailsPage } from './navigation-details';

@NgModule({
  declarations: [
    NavigationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NavigationDetailsPage),
  ],
})
export class NavigationDetailsPageModule {}
