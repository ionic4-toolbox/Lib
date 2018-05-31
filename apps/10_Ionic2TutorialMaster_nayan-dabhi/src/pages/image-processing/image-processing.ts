import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CaptureImagePage } from '../image-processing/capture-image/capture-image';
import { SelectImagePage } from '../image-processing/select-image/select-image';
import { MultiImageSelectPage } from '../image-processing/multi-image/multi-image';

@IonicPage()
@Component({
  selector: 'page-image-processing',
  templateUrl: 'image-processing.html',
})

export class ImageProcessingPage {
  public captureCameraPage: any = CaptureImagePage;
  public selectImagePage: any = SelectImagePage;
  public multiSelectImagePage: any = MultiImageSelectPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
