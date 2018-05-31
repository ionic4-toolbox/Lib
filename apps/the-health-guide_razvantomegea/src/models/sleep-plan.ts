// Third-party
import * as moment from 'moment';
import * as _ from 'lodash';

// Models
import { WarningMessage } from './warning-message';

export class SleepHabit {
    constructor(
        public bedTime: string = '22:00',
        public date: number = moment().dayOfYear(),
        public duration: number = 8,
        public wakeUpTime: string = '06:00',
        public warnings: Array<WarningMessage> = []
    ) { }
}


export class SleepPlan {
    constructor(
        public daysOfImbalance: number = 0,
        public imbalancedSleep: boolean = false,
        public sleepOscillation: number = 0,
        public sleepPattern: Array<SleepHabit> = _.fill(Array(7), new SleepHabit())
    ) { }
}