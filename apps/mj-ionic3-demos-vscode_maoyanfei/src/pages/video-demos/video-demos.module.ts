import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoDemosPage } from './video-demos';

//import { RTCMultiConnection } from '../../providers/RTCMultiConnection'

@NgModule({
  declarations: [
    VideoDemosPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoDemosPage),
  ],
  providers: [
    //RTCMultiConnection,
  ]
})
export class VideoDemosPageModule { }
