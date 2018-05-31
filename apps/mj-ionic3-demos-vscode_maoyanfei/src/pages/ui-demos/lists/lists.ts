import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
  items1 = [
    '张三',
    '李四',
    '王五',
    '赵六',
    '张三一',
    '李四一',
    '王五一',
    '赵六一',
    '张三二',
    '李四二',
    '王五二',
    '赵六二',
    '张三三',
    '李四三',
    '王五三',
    '赵六三'
  ];
  items2 = [
    '张三',
    '李四',
    '王五',
    '赵六'
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
