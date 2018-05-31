import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmployeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html',
})
export class EmployeesPage {

  staffList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.staffList = [
      {name: "Naruto", company: "Kementerian Kerja Raya", imageURL: "assets/imgs/naruto.png"},
      {name: "Luffy", company: "Kementerian Kerja Raya", imageURL: "assets/imgs/luffy.png"},
      {name: "Shin Chan", company: "Kementerian Kerja Raya", imageURL: "assets/imgs/shinchan.png"}
    ]
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EmployeesPage');
  }

}
