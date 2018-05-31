import { IconSelectComponent } from './../../components/icon-select/icon-select';
import { Volume, Degree, Speed, Distance, Pressure, EVENTS, IconSetList } from './../../providers/strings';
import { PreferencesService } from './../../services/preferences';
import { Component } from '@angular/core';
import { IonicPage, NavParams, Events, PopoverController } from 'ionic-angular';
import { Pref } from '../../models/IPref';
import { Place } from '../../models/IPlace';

@IonicPage()
@Component({
  selector: 'page-pref',
  templateUrl: 'pref.html',
})
export class PrefPage {

  edits: Pref;
  original: Pref;
  readonly iconSet: number[] = IconSetList;

  deg = Degree;
  vol = Volume;
  speed = Speed;
  dist = Distance;
  press = Pressure;

  readonly unitDic = { degree: this.deg, volume: this.vol, speed: this.speed, distance: this.dist, pressure: this.press };

  constructor(private popOverCtrl: PopoverController, private event: Events, private ps: PreferencesService, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.original = this.navParams.get("pref");
    // clone origianl
    this.edits = Object.assign({}, this.original);
  }

  deleteLocation(place: Place) {
    this.edits.locations = this.edits.locations.filter(p => p.toString() != place.toString());
  }

  openIconSelect() {
    let data = { setNum: this.edits.icon };
    let grid = this.popOverCtrl.create(IconSelectComponent, data);
    grid.onDidDismiss((iconChoice: number) => {
      if (iconChoice === null) {
        return;
      } else if (typeof iconChoice === "undefined") {
        // reopen IconSelect when scren orientation changes
        this.openIconSelect();
      } else if (iconChoice != this.edits.icon) {
        this.edits.icon = iconChoice;
      }
    });
    grid.present();
  }

  ionViewWillLeave() {
    if (!this.compare(this.edits, this.original)) {
      this.ps.setPref(this.edits).then(r => {
        // destory original before sending changes
        this.original = this.edits;
        this.event.publish(EVENTS.change, this.edits);
        console.log("saved preferences");
      });
    }
  }

  private compare(edit: Pref, original: Pref) {
    if (edit.degree != original.degree ||
      edit.distance != original.distance ||
      edit.icon != original.icon ||
      edit.locations.length != original.locations.length ||
      edit.pressure != original.pressure ||
      edit.speed != original.speed ||
      edit.volume != original.volume) {
      return false;
    }
    return true;
  }

}
