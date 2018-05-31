import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'HeroesDemoPage';
  tab2Root = 'UiDemosPage';
  tab3Root = 'MapDemosPage';
  tab4Root = 'VideoDemosPage';
  tab5Root = 'SchedulePage';
  tab6Root = 'SpeakerListPage';
  //tab6Root = 'AboutPage';
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
