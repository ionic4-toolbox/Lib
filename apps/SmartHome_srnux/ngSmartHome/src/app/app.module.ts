import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './shared/modules/material.module'

import { AppRoutingModule } from './app-routing.module';
import {NavMenuComponent} from './navmenu/navmenu.component'


import { AppComponent } from './app.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetchdata/fetchdata.component'
import {SamuraiModule} from './samurai/samurai.module'
import {ProductModule} from './products/product.module'
import {SensorModule} from './sensors/sensor.module'

import {CdkTableModule} from '@angular/cdk/table';
import {TableHeaderDemo} from './table/table-header-demo';
import {TableDemo} from './table/table-demo';
import {PeopleDatabase} from './table/people-database'

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,TableHeaderDemo,TableDemo
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SamuraiModule,
    ProductModule,
    //CdkTableModule,
    SensorModule
  ],
  providers: [PeopleDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
