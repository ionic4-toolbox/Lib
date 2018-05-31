import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  tabCard: string = 'home-card';
  tabUserList: string = 'home-userList';
}
