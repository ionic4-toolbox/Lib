import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { CommonController } from '../../../providers/CommonController';
import { ImageListPage } from '../image-list/image-list';

@Component({
  selector: 'page-multi-select-image',
  templateUrl: 'multi-image.html'
})

export class MultiImageSelectPage {
  public imageOptions = {
    maximumImagesCount: 8,
    width: 200,
    height: 200,
    quality: 100
  }

  constructor(private navCtrl: NavController,
    public platform: Platform,
    public commonController: CommonController,
    public imagePicker: ImagePicker
  ) {

  }

  isRunOnMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  openGallery() {
    if (this.isRunOnMobileDevice()) {
      this.imagePicker.getPictures(this.imageOptions).then((file_uris) => {
        // console.log(file_uris);

        this.navCtrl.push(ImageListPage, { images: file_uris })
      }, (err) => {
        console.log(err);

        this.commonController.showToast(err, "bottom", 3000, true, "Ok", true);
      });
    } else {
      this.commonController.showToast("Camera plugin does not work in browser.", "bottom", 3000, true, "Ok", true);
    }
  }
}
