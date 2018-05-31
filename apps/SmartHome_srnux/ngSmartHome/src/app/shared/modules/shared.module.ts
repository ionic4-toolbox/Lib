import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvironmentHttpModule }  from './environment.http.module';

import { StarComponent } from '../components/star.component';

@NgModule({
  imports: [ CommonModule],
  exports : [
    CommonModule,
    FormsModule,
    StarComponent,
    EnvironmentHttpModule
  ],
  declarations: [ StarComponent ],
})
export class SharedModule { }
