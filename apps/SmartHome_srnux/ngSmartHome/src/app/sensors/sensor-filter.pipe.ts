import {  PipeTransform, Pipe } from '@angular/core';
import { ISensor } from './sensor';

@Pipe({
    name: 'sensorFilter'
})
export class SensorFilterPipe implements PipeTransform {

    transform(value: ISensor[], filterBy: string): ISensor[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((sensor: ISensor) =>
            sensor.modelid.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
