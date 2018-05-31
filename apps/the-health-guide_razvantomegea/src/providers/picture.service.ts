import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// Third-party
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import * as moment from 'moment';

// Added plugin camera
// To add npm camera

@Injectable()
export class PictureService {
  private _cameraOpts: CameraOptions;
  private _captureDataUrl: string;
  private _imagePickerOpts: ImagePickerOptions;
  private _images: firebase.storage.Reference;
  private _pictureObserver: Observer<string>;
  private _uploadTask: firebase.storage.UploadTask;
  constructor(
    private _camera: Camera,
    private _fb: FirebaseApp,
    private _imagePicker: ImagePicker,
    private _user: User
  ) {
    this._cameraOpts = {
      allowEdit: true,
      quality: 100,
      destinationType: _camera.DestinationType.DATA_URL,
      encodingType: _camera.EncodingType.JPEG,
      mediaType: _camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };

    this._imagePickerOpts = {
      maximumImagesCount: 1
    };

    this._images = _fb.storage().ref().child(`${_user.id}/images`);
  }

  public cancelUpload(): void {
    this._uploadTask.cancel();
    this._pictureObserver.complete();
  }

  public chooseImage(): Promise<string> {
    return new Promise((resolve, reject) => this._imagePicker.getPictures(this._imagePickerOpts).then((results: Array<string>) => resolve(results[0]), (err: Error) => reject(err)));
  }

  public takePhoto(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._camera.getPicture(this._cameraOpts).then((imageData: ImageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this._captureDataUrl = `data:image/jpeg;base64,${imageData}`;
        resolve(this._captureDataUrl);
      }, (err: Error) => reject(err));
    });
  }

  public uploadImage(pathName: string, img?: File): Observable<string | number> {
    /**
     * FIXME: Firebase sends an uncaught error on cancel and don't know how to catch it
     */
    let progress: number;
    return new Observable((observer: Observer<string | number>) => {
      this._uploadTask = img ? this._images.child(`${pathName}/${img.name}`).put(img) : this._images.child(`${pathName}/${moment().format('DDMMYYHHmmss')}.jpg`).putString(this._captureDataUrl, firebase.storage.StringFormat.DATA_URL);
      this._pictureObserver = observer;

      this._uploadTask.catch((err: Error) => observer.error(err));

      this._uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
        progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        observer.next(progress);
      }, (err: Error) => observer.error(err),
        () => {
          observer.next(this._uploadTask.snapshot.downloadURL);
          observer.complete()
        });
    });
  }
}
