import { ForecastListComponent } from './forecast-list/forecast-list';
import { NgModule } from '@angular/core';
import { HeaderButtonsComponent } from './header-buttons/header-buttons';
import { IonicModule } from 'ionic-angular/module';
import { PipesModule } from '../pipes/pipes.module';
import { LocationSelectComponent } from './location-select/location-select';
import { IconSelectComponent } from './icon-select/icon-select';
@NgModule({
	declarations: [HeaderButtonsComponent, ForecastListComponent, LocationSelectComponent, IconSelectComponent],
	imports: [IonicModule, PipesModule],
	exports: [HeaderButtonsComponent, ForecastListComponent],
	entryComponents: [LocationSelectComponent, IconSelectComponent]
})
export class ComponentsModule {}
