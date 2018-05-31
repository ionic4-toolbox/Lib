// Third-party
import * as moment from 'moment';

// Models
import { WarningMessage } from './warning-message';

export class Activity {
    constructor(
        public type: string,
        public duration: number = 0,
        public energyBurn: number = 0,
        public met: number = 1,
        public name: string = '',
        public time: string = moment().format('HH:mm')
    ) { }
}

export class ActivityPlan {
    constructor(
        public activities: Array<Activity> = [],
        public date: number = moment().dayOfYear(),
        public intenseDays: number = 0,
        public totalDuration: number = 0,
        public totalEnergyBurn: number = 0,
        public warnings: Array<WarningMessage> = []
    ) { }
}