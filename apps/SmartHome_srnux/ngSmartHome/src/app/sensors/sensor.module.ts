import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SensorListComponent } from './sensor-list.component';
import { SensorTableComponent } from './sensor-table.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorDetailGuard, SensorEditGuard } from './sensor-guard.service';
import { SensorEditComponent } from './sensor-edit.component';

import { SensorFilterPipe } from './sensor-filter.pipe';
import { SensorService } from './sensor.service';

import { SharedModule } from '../shared/modules/shared.module';

//add to shared module maybe?
import { MaterialModule } from '../shared/modules/material.module';
import { CookieService } from '../shared/services/cookie.service';
import { EnvironmentService } from '../shared/services/environment.service';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SensorHttpModule }  from './sensors.http.module';
//import { SensorData }  from './sensor-data';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    SensorHttpModule,
    //InMemoryWebApiModule.forRoot(SensorData),
    RouterModule.forChild([
      { path: 'sensors', component: SensorListComponent },
      { path: 'sensorsTable', component: SensorTableComponent },
      { path: 'sensorsList', component: SensorListComponent },
      { path: 'sensor/:id',
        canActivate: [ SensorDetailGuard],
        component: SensorDetailComponent
      },
      { path: 'sensorEdit/:id',
        canDeactivate: [ SensorEditGuard ],
        component: SensorEditComponent },
    ])
  ],
  declarations: [
    SensorListComponent,
    SensorTableComponent,
    SensorDetailComponent,
    SensorEditComponent,
    SensorFilterPipe
  ],
  providers: [
    SensorService,
    SensorDetailGuard,
    SensorEditGuard,
    CookieService,
    EnvironmentService
  ]
})
export class SensorModule {}
