import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from '@ionic/cloud-angular';

// Third-party
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as moment from 'moment';

// Models
import { Activity, ActivityPlan, Fitness, WarningMessage } from '../models';

// Providers
import { FitnessService } from './fitness.service';
import { MealService } from './meal.service';
import { NutritionService } from './nutrition.service';

const CURRENT_DAY: number = moment().dayOfYear();

@Injectable()
export class ActivityService {
  private _activities$: FirebaseListObservable<Array<Activity>>;
  private _currentActivityPlan: FirebaseObjectObservable<ActivityPlan>;
  private _lastActivityPlan: FirebaseObjectObservable<ActivityPlan>;
  private _userWeight: number;
  constructor(
    private _db: AngularFireDatabase,
    private _fitSvc: FitnessService,
    private _mealSvc: MealService,
    private _nutritionSvc: NutritionService,
    private _user: User
  ) {
    this._activities$ = _db.list('/activities', {
      query: {
        orderByChild: 'name'
      }
    });
    this._currentActivityPlan = _db.object(`/activity-plans/${_user.id}/${CURRENT_DAY}`);
    this._lastActivityPlan = _db.object(`/activity-plans/${_user.id}/${CURRENT_DAY - 1}`);
    this._userWeight = +_fitSvc.getUserWeight();
  }

  private _checkInactivity(duration: number, activityPlan: ActivityPlan): void {
    if (duration === 0) {
      activityPlan.warnings = [...activityPlan.warnings, new WarningMessage(
        'You have to move every day',
        'According to WHO, sedentary lifestyles increase all causes of mortality, double the risk of cardiovascular diseases, diabetes, and obesity, and increase the risks of colon cancer, high blood pressure, osteoporosis, lipid disorders, depression and anxiety'
      )];
    }
  }

  private _checkIntenseExercise(activities: Array<Activity>, activityPlan: ActivityPlan): void {
    if (!!activities.map((activity: Activity) => activity.met >= 8).length) {
      activityPlan.intenseDays++;
    }
  }

  private _checkIntenseRoutine(activityPlan: ActivityPlan): void {
    if (activityPlan.intenseDays > 5) {
      activityPlan.warnings = [...activityPlan.warnings, new WarningMessage(
        'Too much intense exercise',
        'Your body needs some days of to recover'
      )];
    } else if (activityPlan.intenseDays === 0) {
      activityPlan.warnings = [...activityPlan.warnings, new WarningMessage(
        "You didn't exercise intensly at all last week",
        'You need to reach your target heart rate to get full benefits of your exercise'
      )];
    }
  }

  public calculateDurationTotal(activities: Array<Activity>): number {
    return activities.reduce((acc: number, currActivity: Activity) => acc += currActivity.duration, 0);
  }

  public calculateEnergyBurn(activity: Activity): number {
    return Math.round((activity.met * 3.5 * this._userWeight / 200) * activity.duration);
  }

  public calculateEnergyBurnTotal(activities: Array<Activity>): number {
    return activities.reduce((acc: number, currActivity: Activity) => acc += currActivity.energyBurn, 0);
  }

  public checkActivity(activity: Activity, activityPlan: ActivityPlan): void {
    if (activity.met >= 8 && activity.duration > 45) {
      activityPlan.warnings = [new WarningMessage(
        'Too much intense exercise at once',
        'Keep your intense exercise sessions to less than 45 minutes'
      )];
    } else {
      activityPlan.warnings = [];
    }
  }

  public getActivities$(): FirebaseListObservable<Array<Activity>> {
    return this._activities$;
  }

  public getActivityPlan$(): Observable<ActivityPlan> {
    return new Observable((observer: Observer<ActivityPlan>) => {
      this._currentActivityPlan.subscribe((currActivityPlan: ActivityPlan) => {
        if (currActivityPlan['$value'] === null) {
          // Get the previous day activity plan to check for activity imbalances
          this._lastActivityPlan.subscribe((lastActivityPlan: ActivityPlan) => {
            currActivityPlan = new ActivityPlan();
            if (!lastActivityPlan.hasOwnProperty('$value')) {
              this._checkInactivity(lastActivityPlan.totalDuration, currActivityPlan);
              currActivityPlan.intenseDays = lastActivityPlan.intenseDays;
              if (moment().day() < moment().dayOfYear(lastActivityPlan.date).day() || moment().day() === 1) {
                this._checkIntenseRoutine(currActivityPlan);
                currActivityPlan.intenseDays = 0;
              }

              this._checkIntenseExercise(lastActivityPlan.activities, currActivityPlan);
              observer.next(currActivityPlan);
            }
          });
        } else {
          // Firebase removes empty objects on save
          currActivityPlan.activities = currActivityPlan.activities || [];
          currActivityPlan.warnings = currActivityPlan.warnings || [];
          observer.next(currActivityPlan);
        }
      });
    });
  }

  public getLeftEnergy(): Promise<number> {
    return new Promise(resolve => Promise.all([this._fitSvc.restoreEnergyConsumption(), this._fitSvc.restoreEnergyIntake()]).then((data: Array<number>) => resolve(data[1] - data[0])));
  }

  public saveActivityPlan(activityPlan: ActivityPlan): void {
    // Update the user daily requirements
    this.updateUserRequirements(activityPlan.totalEnergyBurn);
    this._currentActivityPlan.update({
      activities: activityPlan.activities,
      date: activityPlan.date,
      totalDuration: activityPlan.totalDuration,
      totalEnergyBurn: activityPlan.totalEnergyBurn,
      warnings: activityPlan.warnings
    });
  }

  /**
   * Updates the user's requirements based on his energy consumptions
   */
  public updateUserRequirements(energyConsumption: number): void {
    let userFitness: Fitness = this._fitSvc.getFitness();
    this._fitSvc.storeEnergyConsumption(userFitness.bmr + energyConsumption);
    userFitness.requirements = this._nutritionSvc.getDri(userFitness.age, userFitness.bmr + energyConsumption, userFitness.gender, userFitness.lactating, userFitness.pregnant, userFitness.weight);
    this._fitSvc.saveFitness(userFitness);
  }
}
