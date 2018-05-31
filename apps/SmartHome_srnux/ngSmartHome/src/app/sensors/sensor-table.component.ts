import { Component, OnInit }  from '@angular/core';

import { ISensor } from './sensor';
import { SensorService } from './sensor.service';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
@Component({
    selector: 'sensors-table',
    templateUrl: './sensor-table.component.html',
    styleUrls: ['./sensor-list.component.scss']
})
export class SensorTableComponent implements OnInit {
    pageTitle: string = 'Sensor List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    objectKeys = Object.keys;

    sensors: ISensor[];

    displayedColumns = ['id', 'modelid', 'manufacturername', 'state.temperature'];
    dataSource = new SensorsTableDataSource(this.sensorService);

    constructor(private sensorService: SensorService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        // this.sensorService.getSensors()
        //         .subscribe(sensorsJson => this.sensors = this.sensorsList(sensorsJson),
        //                    error => this.errorMessage = <any>error);
        // this.sensorService.getSensors()
        // .subscribe(sensorsJson => this.sensors = this.sensorsList(sensorsJson),
        //             error => this.errorMessage = <any>error);
    }

    // getSensors():Observable<ISensor[]>{
    //     return this.sensorService.getSensors()
    //     .do(sensorsJson => this.sensors = this.sensorsList(sensorsJson),
    //                 error => this.errorMessage = <any>error);
    // }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Sensor List: ' + message;
    }

    // sensorsList(sensorsJson:any):ISensor[]{
    //     console.log('updateSensor: ' + JSON.stringify(sensorsJson));
    //     return Object.keys(sensorsJson).map(function(_) { return sensorsJson[_]; });
    // }

    // sensorsList(sensorsJson:any):ISensor[]{
    //     console.log('updateSensor: ' + JSON.stringify(sensorsJson));
    //     return sensorsJson;//Object.keys(sensorsJson).map(function(_) { return sensorsJson[_]; });
    // }

    //convert to array
    sensorsList(sensorsJson:any):ISensor[]{
        console.log('updateSensor: ' + JSON.stringify(sensorsJson));
        return Object.keys(sensorsJson).map(function(_) { return sensorsJson[_]; });
    }
}

export class SensorsTableDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    
    constructor(private sensorService: SensorService) {
        super();
    }

    connect(): Observable<ISensor[]> {
      return this.sensorService.getSensorsArray();
    }
  
    disconnect() {}
  }
