import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { CounterComponent } from './counter/counter.component';
import { SamuraiComponent } from './samurai/samurai.component'
import { ProductListComponent } from './products/product-list.component'
import {TableDemo} from './table/table-demo'
import { SensorListComponent } from './sensors/sensor-list.component'
import { SensorTableComponent } from './sensors/sensor-table.component'

const routes: Routes = [
    { path: '', redirectTo: 'samurai', pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: 'samurai', component: SamuraiComponent },
    { path: 'home', component: SamuraiComponent },
    { path: 'products', component: ProductListComponent },
    {path:'table',component:TableDemo},
    {path:'sensors',component:SensorTableComponent}
   // { path: '**', redirectTo: 'samurai' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
