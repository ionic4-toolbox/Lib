import { Component } from '@angular/core';
import { NavParams, Events, Platform } from 'ionic-angular';

import { ThreeDays } from '../three-days/three-days';
import { TenDays } from '../ten-days/ten-days';
import { Current } from '../current/current';
import { Place } from '../../models/IPlace';
import { EVENTS } from '../../providers/strings';
import { Pref } from '../../models/IPref';
import { PreferencesService } from '../../services/preferences';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  data: { search: Place, pref: Pref } = {search: null, pref: null};

  tab1Root = Current;
  tab2Root = ThreeDays;
  tab3Root = TenDays;

  constructor(platform: Platform, event: Events, params: NavParams, ps: PreferencesService) {
    this.data.search = params.data.place;
    event.subscribe(EVENTS.gps, place => this.data.search = place);
    event.subscribe(EVENTS.init, pref => this.data.pref = pref);
    // to pass on pref changes to unconstructed tabs
    event.subscribe(EVENTS.change, pref => this.data.pref = pref);
    platform.ready().then(() => {
      ps.initialize();
    });
  }
}
