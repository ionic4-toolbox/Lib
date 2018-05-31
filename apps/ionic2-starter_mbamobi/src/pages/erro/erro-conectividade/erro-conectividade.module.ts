import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErroConectividadePage } from './erro-conectividade';

@NgModule({
  declarations: [
    ErroConectividadePage
  ],
  imports: [
    IonicPageModule.forChild(ErroConectividadePage),
  ],
  exports: [
    ErroConectividadePage
  ]
})
export class ErroConectividadeModule {}
