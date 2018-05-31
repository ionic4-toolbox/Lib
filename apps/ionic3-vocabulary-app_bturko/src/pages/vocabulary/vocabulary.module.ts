import { NgModule }        from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocabularyPage }  from './vocabulary';
import { WordsService }    from '../../shared/services/words.service'

@NgModule({
  declarations: [
    VocabularyPage,
  ],
  imports: [
    IonicPageModule.forChild(VocabularyPage),
  ],
  providers: [ WordsService ]
})
export class VocabularyPageModule {}
