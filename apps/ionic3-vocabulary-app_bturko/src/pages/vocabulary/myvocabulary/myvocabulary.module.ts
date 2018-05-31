import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVocabularyPage } from './myvocabulary';

@NgModule({
  declarations: [
    MyVocabularyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVocabularyPage),
  ],
})
export class MyvocabularyPageModule {}
