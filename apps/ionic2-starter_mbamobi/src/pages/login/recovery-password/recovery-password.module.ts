import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoveryPasswordPage } from './recovery-password';

@NgModule({
  declarations: [
    RecoveryPasswordPage
  ],
  imports: [
    IonicPageModule.forChild(RecoveryPasswordPage),
  ],
  exports: [
    RecoveryPasswordPage
  ]
})
export class LoginRecoveryPasswordModule {}
