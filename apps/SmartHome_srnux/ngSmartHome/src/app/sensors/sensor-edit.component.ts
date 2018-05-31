import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ISensor } from './sensor';
import { SensorService } from './sensor.service';

import { NumericValidators } from '../shared/validation/number.validator';
import { GenericValidator } from '../shared/validation/generic-validator';

@Component({
    templateUrl: './sensor-edit.component.html'
})
export class SensorEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Sensor Edit';
    errorMessage: string;
    sensorForm: FormGroup;

    sensor: ISensor;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.sensorForm.get('tags');
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private sensorService: SensorService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            sensorName: {
                required: 'Sensor name is required.',
                minlength: 'Sensor name must be at least three characters.',
                maxlength: 'Sensor name cannot exceed 50 characters.'
            },
            sensorCode: {
                required: 'Sensor code is required.'
            },
            starRating: {
                range: 'Rate the sensor between 1 (lowest) and 5 (highest).'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.sensorForm = this.fb.group({
            sensorName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            sensorCode: ['', Validators.required],
            starRating: ['', NumericValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the sensor Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getSensor(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.sensorForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.sensorForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    getSensor(id: number): void {
        this.sensorService.getSensor(id)
            .subscribe(
                (sensor: ISensor) => this.onSensorRetrieved(sensor),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSensorRetrieved(sensor: ISensor): void {
        
        // if (this.sensorForm) {
        //     this.sensorForm.reset();
        // }
        // this.sensor = sensor;

        // if (this.sensor.id === 0) {
        //     this.pageTitle = 'Add Sensor';
        // } else {
        //     this.pageTitle = `Edit Sensor: ${this.sensor.sensorName}`;
        // }

        // // Update the data on the form
        // this.sensorForm.patchValue({
        //     sensorName: this.sensor.sensorName,
        //     sensorCode: this.sensor.sensorCode,
        //     starRating: this.sensor.starRating,
        //     description: this.sensor.description
        // });
        // this.sensorForm.setControl('tags', this.fb.array(this.sensor.tags || []));
    }

    deleteSensor(): void {
    //     if (this.sensor.id === 0) {
    //         // Don't delete, it was never saved.
    //         this.onSaveComplete();
    //    } else {
    //         if (confirm(`Really delete the sensor: ${this.sensor.sensorName}?`)) {
    //             this.sensorService.deleteSensor(this.sensor.id)
    //                 .subscribe(
    //                     () => this.onSaveComplete(),
    //                     (error: any) => this.errorMessage = <any>error
    //                 );
    //         }
    //     }
    }

    saveSensor(): void {
        // if (this.sensorForm.dirty && this.sensorForm.valid) {
        //     // Copy the form values over the sensor object values
        //     let p = Object.assign({}, this.sensor, this.sensorForm.value);

        //     this.sensorService.saveSensor(p)
        //         .subscribe(
        //             () => this.onSaveComplete(),
        //             (error: any) => this.errorMessage = <any>error
        //         );
        // } else if (!this.sensorForm.dirty) {
        //     this.onSaveComplete();
        // }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.sensorForm.reset();
        this.router.navigate(['/sensors']);
    }
}
