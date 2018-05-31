import { Component, OnInit }  from '@angular/core';

import { ISensor } from './sensor';
import { SensorService } from './sensor.service';

@Component({
    templateUrl: './sensor-list.component.html',
    styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {
    pageTitle: string = 'Sensor List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    objectKeys = Object.keys;

    sensors: ISensor[];

    constructor(private sensorService: SensorService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        // this.sensorService.getSensors()
        //         .subscribe(sensorsJson => this.sensors = this.sensorsList(sensorsJson),
        //                    error => this.errorMessage = <any>error);
        this.sensorService.getSensors()
        .subscribe(sensorsJson => this.sensors = this.sensorsList(sensorsJson),
                    error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Sensor List: ' + message;
    }

    // sensorsList(sensorsJson:any):ISensor[]{
    //     console.log('updateSensor: ' + JSON.stringify(sensorsJson));
    //     return Object.keys(sensorsJson).map(function(_) { return sensorsJson[_]; });
    // }

    sensorsList(sensorsJson:any):ISensor[]{
        console.log('updateSensor: ' + JSON.stringify(sensorsJson));
        return sensorsJson;//Object.keys(sensorsJson).map(function(_) { return sensorsJson[_]; });
    }
}
