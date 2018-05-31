import { NgModule }          from '@angular/core';
import { IonicPageModule }   from 'ionic-angular';
import { AppVocabularyPage } from './appvocabulary';

@NgModule({
  declarations: [
    AppVocabularyPage,
  ],
  imports: [
    IonicPageModule.forChild(AppVocabularyPage),
  ],
})
export class AppVocabularyPageModule {}
