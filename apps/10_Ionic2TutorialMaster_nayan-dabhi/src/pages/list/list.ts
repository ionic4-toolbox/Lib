import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StaticListPage } from '../list/static-list/static-list';
import { ListHttpPage } from '../list/list-http/list-http';
import { ListHttpRefreshPage } from '../list/list-http-refresh/list-http-refresh';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  constructor(public navCtrl: NavController) {

  }

  openPage(pageName) {
    if (pageName == "StaticListPage") {
      this.navCtrl.push(StaticListPage);
    } else if (pageName == "ListHttpPage") {
      this.navCtrl.push(ListHttpPage);
    } else if (pageName == "ListHttpRefreshPage") {
      this.navCtrl.push(ListHttpRefreshPage);
    }
  }
}
