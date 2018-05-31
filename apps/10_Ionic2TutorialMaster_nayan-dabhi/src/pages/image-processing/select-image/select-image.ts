import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

import { CommonController } from '../../../providers/CommonController';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@Component({
  selector: 'page-select-image',
  templateUrl: 'select-image.html',
})

export class SelectImagePage {
  public toast: any;
  public imageSrc: string;
  public isLoaded: boolean;

  public allCameraOptions = {
    // allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    correctOrientation: true
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public commonController:CommonController,
    public camera: Camera,
    public photoViewer: PhotoViewer
  ) {
    this.imageSrc = "assets/img/img-icon.png";
    this.isLoaded = false;
  }

  isRunOnMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  openGallery() {
    if (this.isRunOnMobileDevice()) {
      this.camera.getPicture(this.allCameraOptions).then((file_uri) => {
        this.imageSrc = file_uri;
        this.isLoaded = true;
      }, (err) => {
        console.log(err);

        this.isLoaded = false;
        this.commonController.showToast(err, "bottom", 3000, true, "Ok", true);
      });
    } else {
      this.isLoaded = false;
      this.commonController.showToast("Camera plugin does not work in browser.", "bottom", 3000, true, "Ok", true);
    }
  }

  openImageView() {
    if (this.isLoaded) {
      this.photoViewer.show(this.imageSrc);
    }
  }
}
