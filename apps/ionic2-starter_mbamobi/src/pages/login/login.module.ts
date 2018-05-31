import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    TextMaskModule,
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
    LoginPage
  ]
})
export class LoginModule {}
