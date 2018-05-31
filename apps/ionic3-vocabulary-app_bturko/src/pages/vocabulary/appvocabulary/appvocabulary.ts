import { Component }                           from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable }                          from '@angular/core';
import { WordsService }                        from '../../../shared/services/words.service'
import { IWord }                               from '../../../shared/interfaces/word.interface'

@IonicPage()
@Component({
  selector: 'page-app-vocabulary',
  templateUrl: 'appvocabulary.html',
  providers: [WordsService]
})

@Injectable()
export class AppVocabularyPage {
  words: IWord[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public wordsService: WordsService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VocabularyPage');

    this.getData();
  }

  getData(){
     this.wordsService.getVocabulary().then((words)=>this.words = words)
  }

}
