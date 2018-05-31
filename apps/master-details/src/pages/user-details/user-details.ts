import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { GithubUsersProvider } from '../../providers/github-users/github-users';


@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

	login: string;
	user: User;

  constructor(public navCtrl: NavController, 
  						private githubUsersProvider: GithubUsersProvider,
  						public navParams: NavParams) 
  {
  	this.login = navParams.get('login');
		githubUsersProvider.loadDetails(this.login).subscribe(user => {
		  this.user = user;
		  console.log(user)
		})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

}
