import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { PersonListProvider } from '../../../providers/person-list/person-list';
import { CommonController } from '../../../providers/CommonController';

@Component({
  selector: 'page-list-http-refresh',
  templateUrl: 'list-http-refresh.html',
  providers: [PersonListProvider]
})

export class ListHttpRefreshPage {
  public mSelectedViewType: string = "list";
  public mResponse: any;

  public mLoader: any;
  public mRefresher: any;
  public mInfiniteScroll: any;

  public mProductList: any = [];
  public page: number = 1;
  public totalItem: number = 0;
  public rows: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public APIListProvider: PersonListProvider,
    public loadingCtrl: LoadingController,
    public commonCtrl: CommonController
  ) {
    this.loadData(true);
  }

  presentLoading() {
    this.mLoader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.mLoader.onDidDismiss(() => {
      // console.log('Dismissed loading');
    });

    this.mLoader.present();
  }

  loadData(isLoading) {
    if (isLoading) {
      this.presentLoading();
    }

    this.APIListProvider.loadProductData(this.page)
      .then(data => {
        if (isLoading) {
          this.mLoader.dismiss();
        }

        if (this.mRefresher != null) {
          this.mRefresher.complete();
        }

        if (this.mInfiniteScroll != null) {
          this.mInfiniteScroll.complete();
        }

        if (data != null) {
          this.mResponse = data;

          if (!this.mResponse.isError) {
            this.totalItem = this.mResponse.listing.total;

            for (let i = 0; i < this.mResponse.listing.data.length; i++) {
              this.mProductList.push(this.mResponse.listing.data[i]);
            }

            this.rows = Array.from(Array(Math.ceil(this.mProductList.length / 2)).keys());
          } else {
            this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
          }
        } else {
          this.commonCtrl.showToast("Data not found error.", "bottom", 3000, true, "Ok", true);
        }
      }).catch(error => {
        this.mLoader.dismiss();
        this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
      });
  }

  refreshData() {
    this.page = 1;
    this.totalItem = 0;
    this.mProductList = [];

    if (this.mInfiniteScroll != null) {
      this.mInfiniteScroll.enable(true);
    }
  }

  doRefresh(refresher) {
    if (refresher != null) {
      this.mRefresher = refresher;
    }

    this.refreshData();
    this.loadData(false);
  }

  loadMoreData(infiniteScroll) {
    if (infiniteScroll != null) {
      this.mInfiniteScroll = infiniteScroll;
    }

    // console.log("Total Data : " + this.totalItem);
    // console.log("Product Data : " + this.mProductList.length);

    if (this.mProductList.length < this.totalItem) {
      this.page++;
      this.loadData(false);
    } else {
      this.mInfiniteScroll.complete();
      this.mInfiniteScroll.enable(false);

      this.commonCtrl.showToast("No more data available.", "bottom", 3000, true, "Ok", true);
    }
  }

  changeViewType(viewType) {
    this.mSelectedViewType = viewType;
  }

}
