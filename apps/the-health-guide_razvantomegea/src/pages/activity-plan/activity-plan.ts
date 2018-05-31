// App
import { Component } from '@angular/core';
import { Alert, AlertController, Modal, ModalController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

// Models
import { Activity, ActivityPlan } from '../../models';

// Pages
import { ActivitySelectPage } from '../activity-select/activity-select';

// Providers
import { ActivityService, FitnessService } from '../../providers';

@Component({
  selector: 'page-activity-plan',
  templateUrl: 'activity-plan.html'
})
export class ActivityPlanPage {
  private _activityPlanSubscription: Subscription;
  public activityPlan: ActivityPlan = new ActivityPlan();
  public activityPlanDetails: string = 'guidelines';
  public isDirty: boolean = false;
  public leftEnergy: number = 0;
  constructor(
    private _activitySvc: ActivityService,
    private _alertCtrl: AlertController,
    private _fitSvc: FitnessService,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController
  ) { }

  private _updateActivityPlan(): void {
    this.isDirty = true;
    this.activityPlan.totalDuration = this._activitySvc.calculateDurationTotal(this.activityPlan.activities);
    this.activityPlan.totalEnergyBurn = this._activitySvc.calculateEnergyBurnTotal(this.activityPlan.activities);
  }

  public addNewActivity(): void {
    let activitySelectModal: Modal = this._modalCtrl.create(ActivitySelectPage);
    activitySelectModal.present();
    activitySelectModal.onDidDismiss((activities: Array<Activity>) => {
      if (!!activities.length) {
        this.activityPlan.activities = [...this.activityPlan.activities, ...activities];
        this.activityPlan.activities.forEach((activity: Activity) => this._activitySvc.checkActivity(activity, this.activityPlan));
        this._updateActivityPlan();
      }
    });
  }

  public changeDuration(activity: Activity): void {
    let alert: Alert = this._alertCtrl.create({
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
        },
        {
          text: 'Done',
          handler: data => {
            activity.duration = +data.duration;
            activity.energyBurn = this._activitySvc.calculateEnergyBurn(activity);
            this._activitySvc.checkActivity(activity, this.activityPlan);
            this._updateActivityPlan();
          }
        }
      ]
    });
    alert.present();
  }

  public removeActivity(idx: number): void {
    this.activityPlan.activities = [...this.activityPlan.activities.slice(0, idx), ...this.activityPlan.activities.slice(idx + 1)];
    this._updateActivityPlan();
  }

  public saveActivityPlan(): void {
    this._activitySvc.saveActivityPlan(this.activityPlan);
    this._activitySvc.updateUserRequirements(this.activityPlan.totalEnergyBurn);
    setTimeout(() => this._activitySvc.getLeftEnergy().then((energy: number) => this.leftEnergy = energy), 1000);
    this.isDirty = false;
  }

  ionViewCanLeave(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isDirty) {
        this._alertCtrl.create({
          title: 'Discard changes',
          message: 'Changes have been made. Are you sure you want to leave?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                resolve(true);
              }
            },
            {
              text: 'No',
              handler: () => {
                reject(true);
              }
            }
          ]
        }).present();
      } else {
        resolve(true);
      }
    });
  }

  ionViewWillEnter(): void {
    this._activitySvc.getLeftEnergy().then((energy: number) => this.leftEnergy = energy);
    this._activityPlanSubscription = this._activitySvc.getActivityPlan$().subscribe((activityPlan: ActivityPlan) => {
      this.activityPlan = Object.assign({}, activityPlan);
    });
  }

  ionViewWillLeave(): void {
    this._activityPlanSubscription.unsubscribe();
  }
}
