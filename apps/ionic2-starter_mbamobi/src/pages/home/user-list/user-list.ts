import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserService } from '../../../services/user/user';
import { UserModel } from '../../../services/user/user.model';

@IonicPage({
  name: 'home-userList'
})
@Component({
  selector: 'page-userlist',
  templateUrl: 'user-list.html',
  providers: [ UserService ]
})
export class UserListPage implements OnInit {

  users: UserModel[] = null;

  constructor(public navCtrl: NavController, public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAll().then((users) => {
      this.users = users;
    }).catch((erro) => {
      this.users = [];
      console.log(erro);
    });
  }
}
