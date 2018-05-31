import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { UserDetailsPage } from '../user-details/user-details';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

	users: User[];
  originalUsers: User[];

  constructor(public navCtrl: NavController, 
              private githubUsersProvider: GithubUsersProvider) 
  {
    githubUsersProvider.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
      //console.log(this.originalUsers);
    })  	

    /*githubUsersProvider.searchUsers('scotch').subscribe(users => {
      console.log(users)
    });*/    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }  

  search(searchEvent) {
    let term = searchEvent.target.value;
    console.log(term);
    if (term.trim() === '' || term.trim().length < 3) {
      this.users = this.originalUsers;
    } else {
      this.githubUsersProvider.searchUsers(term).subscribe(users => {
        this.users = users['items'];
      });
    }
  }  

}
