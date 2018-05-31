import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ch0101HelloWorldPage } from './ch0101-hello-world';

@NgModule({
  declarations: [
    Ch0101HelloWorldPage,
  ],
  imports: [
    IonicPageModule.forChild(Ch0101HelloWorldPage),
  ],
})
export class Ch0101HelloWorldPageModule {}
