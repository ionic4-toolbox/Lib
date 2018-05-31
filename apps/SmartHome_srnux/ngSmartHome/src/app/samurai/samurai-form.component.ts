import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Samurai } from "./samurai.model"

import { NumericValidators } from '../shared/validation/number.validator';
import { GenericValidator } from '../shared/validation/generic-validator';
import { MatchValidators } from '../shared/validation/match.validator';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'samurai-form',
    templateUrl: 'samurai-form.component.html',
    styleUrls: ['samurai-form.component.scss']
})
export class SamuraiFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    samuraiForm: FormGroup; //form model
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    private sub: Subscription;
    samurai: Samurai = new Samurai();
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
        this.validationMessages = {
            firstName: {
                required: 'Please enter your first name.',
                minlength: 'The first name must be longer than 3 characters.',
                maxlength: 'The first name must be shorter than 50 characters.'
            },
            lastName: {
                required: 'Please enter your last name.',
                minlength: 'The last name must be longer than 3 characters.',
                maxlength: 'The last name must be shorter than 50 characters.'
            },
            email: {
                required: 'Please enter your email address.',
                pattern: 'Please enter a valid email address.',
                match: ' '//make sure to place space otherwise it resolves with "undefined"
            },
            confirmEmail: {
                required: 'Please confirm your email address.',
                match: 'The confirmation does not match the email address.'
            },
            phone: {
                number: 'Please confirm your email address.',
                match: 'The confirmation does not match the email address.'
            }
        };
    }

    ngOnInit() {
        // build the data model for our form
        this.buildForm();

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);

        this.subscribeToChanges();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.samuraiForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.samuraiForm);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    subscribeToChanges() {
        this.samuraiForm.get("notification").valueChanges.subscribe(value => this.setNotification(value));

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                //todo: implement service
                //this.getSamurai(id);
                console.log("id" + id);
            }
        );
    }

    buildForm() {
        // build our form
        this.samuraiForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            emailGroup: this.formBuilder.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', Validators.required]
            }, { validator: MatchValidators.matchEntries('email', 'confirmEmail') }),
            phone: '',
            notification: 'email',
            rating: ['', NumericValidators.range(1, 5)],
            sendCatalog: true
        });

        // watch for changes and validate
        //this.samuraiForm.valueChanges.subscribe(data => this.validateForm());
    }

    //validateForm() {
    //    for (let field in this.formErrors) {
    //        // clear that input field errors
    //        this.formErrors[field] = '';

    //        // grab an input field by name
    //        let input = this.samuraiForm.get(field);

    //        if (input.invalid && input.dirty) {
    //            // figure out the type of error
    //            // loop over the formErrors field names
    //            for (let error in input.errors) {
    //                // assign that type of error message to a variable
    //                this.formErrors[field] = this.validationMessages[field][error];
    //            }
    //        }
    //    }
    //}

    processForm() {
        console.log('processing', this.samuraiForm.value);
    }

    save() {
        console.log(this.samuraiForm);
        console.log('Saved: ' + JSON.stringify(this.samuraiForm.value));
    }

    populateTestData(): void {
        this.samuraiForm.patchValue({
            firstName: 'Jack',
            lastName: 'Harkness',
            sendCatalog: false
        });

        //this.samuraiForm.setValue({
        //    firstName: 'Jack',
        //    lastName: 'Harkness',
        //    email: 'jack@torchwood.com'
        //});
    }

    setNotification(notifyVia: string): void {
        console.log(notifyVia);
        const phoneControl = this.samuraiForm.get('phone');
        if (notifyVia === 'sms') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
}