import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageProcessingPage } from './image-processing';

import { CaptureImagePage } from '../image-processing/capture-image/capture-image';
import { SelectImagePage } from '../image-processing/select-image/select-image';
import { MultiImageSelectPage } from '../image-processing/multi-image/multi-image';
import { ImageListPage } from '../image-processing/image-list/image-list';

@NgModule({
  declarations: [
    ImageProcessingPage,
    CaptureImagePage,
    SelectImagePage,
    MultiImageSelectPage,
    ImageListPage
  ],
  imports: [
    IonicPageModule.forChild(ImageProcessingPage),
  ],
  exports: [
    ImageProcessingPage
  ],
  entryComponents: [
    ImageProcessingPage,
    CaptureImagePage,
    SelectImagePage,
    MultiImageSelectPage,
    ImageListPage
  ]
})

export class ImageProcessingPageModule {}
