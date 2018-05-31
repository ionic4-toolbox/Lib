import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserService } from '../../../services/user/user';

@IonicPage({
  name: 'home-card'
})
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
  providers: [ UserService ]
})
export class CardPage {

  cards: any;

  constructor(public userService: UserService) {
    this.userService.list().then(result => {
      this.cards = result;
    });
  }
}
