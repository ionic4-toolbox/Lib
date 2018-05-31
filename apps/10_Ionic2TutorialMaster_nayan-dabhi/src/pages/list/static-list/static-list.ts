import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-static-list',
  templateUrl: 'static-list.html'
})
export class StaticListPage {
  @ViewChild('searchBar') mSearchBar;

  public selectedItem: any;
  public icons: string[];
  public items: Array<{ title: string, note: string, icon: string }>;
  public showSearchBar: boolean = false;
  public searchText: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(StaticListPage, {
      item: item
    });
  }

  onClickSearchIcon() {
    this.showSearchBar = true;
    this.viewController.showBackButton(false);

    setTimeout(() => {
      this.mSearchBar.setFocus();
    },150);
  }

  onSearchCancel() {
    this.showSearchBar = false;
    this.viewController.showBackButton(true);
  }

  onEventHandle(e) {
    if (this.searchText != null && this.searchText.length <= 0) {
      this.onSearchCancel();
    }
  }

  searchData() {
    console.log(this.searchText);
  }

}
