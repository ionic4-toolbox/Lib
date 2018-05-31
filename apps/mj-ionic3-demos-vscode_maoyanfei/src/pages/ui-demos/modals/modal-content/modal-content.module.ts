import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContentPage } from './modal-content';

@NgModule({
  declarations: [
    ModalContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalContentPage),
  ],
})
export class ModalContentPageModule {}
