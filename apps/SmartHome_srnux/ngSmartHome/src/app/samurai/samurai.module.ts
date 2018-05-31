import { NgModule } from '@angular/core';

//import { BrowserModule }  from '@angular/platform-browser';
import {  ReactiveFormsModule }  from '@angular/forms';
// It doesn't work without it http://stackoverflow.com/questions/42063686/cant-bind-to-ngif-since-it-isnt-a-known-property-of-div-in-production-buil
import { BrowserModule } from '@angular/platform-browser';

import '../../app/rxjs-extensions';

//import 'hammerjs';

import { MaterialModule } from '../shared/modules/material.module';

import { SamuraiComponent }          from './samurai.component';
import { SamuraiService }          from './samurai.service';
import { SamuraiFormComponent } from './samurai-form.component';

@NgModule({ 
    imports: [
      
    //BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule
    //HttpModule,
    //AppRoutingModule,
    
  ],
  declarations: [
    SamuraiComponent,
    SamuraiFormComponent
  ],
  providers: [ SamuraiService ],
  exports:[
    SamuraiComponent
  ]
})

export class SamuraiModule { }
