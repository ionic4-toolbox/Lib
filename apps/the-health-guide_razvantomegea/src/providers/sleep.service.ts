// App
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';

// Third-party
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as moment from 'moment';

// Models
import { SleepHabit, SleepPlan, WarningMessage } from '../models';

const CURRENT_DAY: number = moment().dayOfYear();

@Injectable()
export class SleepService {
  private _sleepPlan: FirebaseObjectObservable<SleepPlan>;
  constructor(
    private _db: AngularFireDatabase,
    private _user: User
  ) {
    this._sleepPlan = _db.object(`/sleep-plan/${_user.id}/`);
  }

  private _checkBedtime(sleep: SleepHabit): boolean {
    if (moment(sleep.bedTime, 'hours').hours() > 22) {
      sleep.warnings = [...sleep.warnings, new WarningMessage(
        'Your bedtime is too late',
        'You need to go to bed before 10:00 p.m., because between 10:00 p.m. and 01:00 a.m. our adrenal glands work to repair the body, including melatonin'
      )];
      return false;
    }

    return true;
  }

  private _checkDuration(sleep: SleepHabit): boolean {
    if (sleep.duration < 7) {
      sleep.warnings = [...sleep.warnings, new WarningMessage(
        'Insufficient sleep',
        'We need to catch 5 complete sleep cycles of 90-110 minutes (7-9 hours)'
      )];
      return false;
    }

    return true;
  }

  private _checkOscillation(sleepPlan: SleepPlan): boolean {
    let currBedHM: Array<number>,
      prevBedHM: Array<number>;
    sleepPlan.sleepOscillation = 0;

    for (let i = 0; i < 5; i++) {
      currBedHM = sleepPlan.sleepPattern[i].bedTime.split(':').map(item => +item);
      prevBedHM = sleepPlan.sleepPattern[i + 1].bedTime.split(':').map(item => +item);
      sleepPlan.sleepOscillation += (currBedHM[0] + currBedHM[1] / 60) - (prevBedHM[0] + prevBedHM[1] / 60);
    }

    if ((sleepPlan.sleepOscillation > 1 || sleepPlan.sleepOscillation < -1)) {
      sleepPlan.sleepPattern[0].warnings = [...sleepPlan.sleepPattern[0].warnings, new WarningMessage(
        'You bedtime is too variable',
        'You need to go to bed around the same hour every night to set your circadian rhythm (internal clock)'
      )];
      return false
    }

    return true;
  }

  private _checkSleep(sleepPlan: SleepPlan): boolean {
    sleepPlan.sleepPattern[0].warnings = [];
    this._checkBedtime(sleepPlan.sleepPattern[0]);
    this._checkDuration(sleepPlan.sleepPattern[0]);
    this._checkOscillation(sleepPlan);

    return !sleepPlan.sleepPattern[0].warnings.length;
  }

  public getCurrentSleep(sleepPlan: SleepPlan): SleepHabit {
    let lastSleep: SleepHabit = sleepPlan.sleepPattern[0];
    if (lastSleep.date === CURRENT_DAY) {
      return lastSleep;
    } else {
      if (sleepPlan.sleepPattern.length === 7) {
        sleepPlan.sleepPattern.pop();
      }

      sleepPlan.sleepPattern.unshift(new SleepHabit(
        lastSleep.bedTime,
        CURRENT_DAY,
        lastSleep.duration,
        lastSleep.wakeUpTime
      ));
      if (sleepPlan.imbalancedSleep) {
        sleepPlan.daysOfImbalance++;
      } else {
        sleepPlan.daysOfImbalance = 0;
      }

      return sleepPlan.sleepPattern[0];
    }
  }

  public getSleepDuration(sleep: SleepHabit): number {
    let bedHM: Array<number> = sleep.bedTime.split(':').map(item => +item),
      wakeHM: Array<number> = sleep.wakeUpTime.split(':').map(item => +item);
    return 24 - (bedHM[0] + bedHM[1] / 60) + (wakeHM[0] + wakeHM[1] / 60);
  }

  public getSleepPlan$(): Observable<SleepPlan> {
    return new Observable((observer: Observer<SleepPlan>) => {
      this._sleepPlan.subscribe((sleepPlan: SleepPlan) => {
        if (sleepPlan['$value'] === null) {
          this._sleepPlan.set(new SleepPlan());
        } else {
          observer.next(sleepPlan);
        }
      });
    });
  }

  public saveSleep(sleepPlan: SleepPlan, sleepHabit: SleepHabit): void {
    sleepPlan.sleepPattern[0] = sleepHabit;
    sleepPlan.imbalancedSleep = !this._checkSleep(sleepPlan);
    this._sleepPlan.update({
      daysOfImbalance: sleepPlan.daysOfImbalance,
      imbalancedSleep: sleepPlan.imbalancedSleep,
      sleepOscillation: sleepPlan.sleepOscillation,
      sleepPattern: sleepPlan.sleepPattern
    });
  }
}
