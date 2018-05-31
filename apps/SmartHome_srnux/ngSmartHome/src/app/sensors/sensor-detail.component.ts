import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { ISensor } from './sensor';
import { SensorService } from './sensor.service';

@Component({
    templateUrl: './sensor-detail.component.html'
})
export class SensorDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Sensor Detail';
    sensor: ISensor;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private sensorService: SensorService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getSensor(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getSensor(id: number) {
        this.sensorService.getSensor(id).subscribe(
            sensor => this.sensor = sensor,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/sensors']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Sensor Detail: ' + message;
    }
}
