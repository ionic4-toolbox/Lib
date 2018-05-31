// App
import { Component } from '@angular/core';
import { AlertController, InfiniteScroll, ViewController } from 'ionic-angular';

// Third-party
import { FirebaseListObservable } from 'angularfire2/database';

// Models
import { Activity } from '../../models';

// Providers
import { ActivityService } from '../../providers';


@Component({
  selector: 'page-activity-select',
  templateUrl: 'activity-select.html'
})
export class ActivitySelectPage {
  public activities$: FirebaseListObservable<Array<Activity>>;
  public limit: number = 50;
  public searchQuery: string = '';
  public selectedActivities: Array<Activity> = [];
  constructor(
    private _activitySvc: ActivityService,
    private _alertCtrl: AlertController,
    private _viewCtrl: ViewController
  ) { }

  public cancelSelecting(): void {
    this._viewCtrl.dismiss([]);
  }

  public clearSearch(ev): void {
    this.searchQuery = '';
  }

  public doneSelecting(): void {
    this._viewCtrl.dismiss(this.selectedActivities);
  }

  public loadMore(ev: InfiniteScroll) {
    this.limit += 50;
    setTimeout(() => {
      ev.complete();
    }, 1000);
  }

  public selectActivity(activity: Activity, checkBox: HTMLInputElement): void {
    let idx: number = this.selectedActivities.indexOf(activity);
    if (idx === -1) {
      this._alertCtrl.create({
        title: 'Duration',
        subTitle: 'How long did you perform this activity?',
        inputs: [
          {
            name: 'duration',
            placeholder: 'Minutes',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              checkBox.checked = false;
            }
          },
          {
            text: 'Done',
            handler: (data: { duration: number }) => {
              activity.duration = +data.duration;
              activity.energyBurn = this._activitySvc.calculateEnergyBurn(activity);
              this.selectedActivities = [...this.selectedActivities, activity];
            }
          }
        ]
      }).present();
    } else {
      this.selectedActivities = [...this.selectedActivities.slice(0, idx), ...this.selectedActivities.slice(idx + 1)];
    }

  }

  ionViewWillEnter(): void {
    this.activities$ = this._activitySvc.getActivities$();
  }
}
