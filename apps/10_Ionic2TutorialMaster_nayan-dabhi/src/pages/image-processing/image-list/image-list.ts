import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html'
})

export class ImageListPage {
  private images: Array<string>;
  private grid: Array<Array<string>>;

  constructor(private navCtrl: NavController, public navParams: NavParams) {
    this.images = this.navParams.get('images');
    this.grid = Array(Math.ceil(this.images.length / 2));

    console.log(this.grid);
    console.log(this.images);
    this.loadImages();
  }

  loadImages() {
    let rowNum = 0;

    for (let i = 0; i < this.images.length; i += 2) {
      this.grid[rowNum] = Array(2);

      if (this.images[i]) {
        this.grid[rowNum][0] = this.images[i]
      }

      if (this.images[i + 1]) {
        this.grid[rowNum][1] = this.images[i + 1]
      }

      rowNum++;
    }
  }

}
