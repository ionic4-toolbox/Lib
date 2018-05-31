import { Component }       from '@angular/core';
import { IGame }           from "../../shared/interfaces/game.interface";
import { WordsService }    from "../../shared/services/words.service";
import { UserService }     from "../../shared/services/user.service";
import { IUser }           from "../../shared/interfaces/user.interface";
import { IQuestionEntity } from "../../shared/types/question.type";

@Component({
  selector: 'tag-game1',
  templateUrl: 'tag-game1.html',
  providers: [ WordsService, UserService ]
})
export class TagGame1Component {

  gameResults: boolean = false;
  intvlHandle: any;
  game: IGame;
  user: IUser;
  wordService: WordsService;
  curQuestion: IQuestionEntity;
  stars: number[] = [1, 2, 3]

  constructor(wordService: WordsService, userService: UserService) {

    this.wordService = wordService;
    this.user = userService.getUser();

    this.game = {
      questions: [],
      rightAnswerCount: 0,
      askedCount: 0,
      seconds: 0
    }
    this.curQuestion = {
      words: [{
        id: 0,
        text: "bull",
        translation: "бык",
        level: 4,
        transcription: "[ bʊl ]",
        category: "Животные",
        lang: "",
        transLang: "",
        status: 1
      }],
      rightAnswer: 0
    }
    console.log('baseExperience', this.user.baseExperience)

    this.setGame();
    this.game.seconds = 14;
    userService.setAvailableCategories([0]);

    this.intvlHandle = setInterval(()=>{
      --this.game.seconds;
      if(this.game.seconds < 1) {
        this.gameResults = true;
        clearInterval(this.intvlHandle);
      }
    }, 1000)
  }

  choose(id){
    if(this.game.questions[this.game.askedCount].rightAnswer == id) {
      this.game.rightAnswerCount++;
      this.wordService.addKnownWord(this.game.questions[this.game.askedCount].words[id].id);
    }
    console.log('choose', this.game.rightAnswerCount)
    this.game.askedCount = this.game.askedCount + 1
    this.setGame();
  }

  ionViewDidLoad() {

  }

  setGame(){

    let exceptions: number[] = this.game.questions.map(
        (a)=> a.rightAnswer
    )

    console.log('exceptions', exceptions);
    this.wordService.getRandomWordsArray("Животные", 3, 2+this.user.baseExperience, exceptions).then(
        (words)=>{
          let question = {
            rightAnswer: 1,
            words: words
          }
          this.game.questions.push(question);
          this.curQuestion = this.game.questions[this.game.askedCount];
        }
    );
  }


}
