import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { A11yModule } from '@angular/cdk/a11y';
import { 
  CompatibilityModule , MatAutocompleteModule , MatButtonToggleModule , MatButtonModule , MatCheckboxModule,
  MatDialogModule , MatListModule , MatGridListModule , MatCardModule , MatChipsModule , MatIconModule, 
  MatInputModule , MatMenuModule , MatProgressSpinnerModule , MatProgressBarModule , MatRadioModule ,
  MatRippleModule , MatSelectModule , MatSlideToggleModule , MatSliderModule , MatSidenavModule  ,
  MatSnackBarModule , MatTabsModule , MatToolbarModule , MatTooltipModule ,MatTableModule ,
  MatPaginatorModule , MatFormFieldModule 
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform'; 
//import { StyleModule } from '@angular/cdk'; StyleModule is deprecated. FocusOriginMonitor (the only thing it contained) has been renamed to FocusMonitor and moved to @angular/cdk/a11y (A11yModule).
//https://github.com/angular/material2/blob/master/CHANGELOG.md
import { CdkTableModule} from '@angular/cdk/table';


const MATERIAL_MODULES = [
  CommonModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,

  CdkTableModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  
  MatMenuModule,
  // These modules include providers.
  A11yModule,
  CompatibilityModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
  OverlayModule,
  PlatformModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
