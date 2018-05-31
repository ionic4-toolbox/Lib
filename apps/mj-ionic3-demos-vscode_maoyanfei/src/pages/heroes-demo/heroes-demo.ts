import { Component } from '@angular/core';
import {Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

export class PageInfo {
  pageTitle: string;
  pageName: string;
}

@IonicPage()
@Component({
  selector: 'page-heroes-demo',
  templateUrl: 'heroes-demo.html',
})
export class HeroesDemoPage {
  title: string;
  pages: PageInfo[] = [
    { pageTitle: "1.1 Hello World", pageName: "Ch0101HelloWorldPage" },
    { pageTitle: "1.2 英雄编辑器", pageName: "Ch0102HeroesPage" },
    { pageTitle: "1.3 主从结构", pageName: "Ch0103HeroesPage" },
    { pageTitle: "1.4 多个组件", pageName: "Ch0104HeroesPage" },
    { pageTitle: "1.5 服务", pageName: "Ch0105HeroesPage" },
    { pageTitle: "1.6 路由", pageName: "Ch0106DashboardPage" },
    { pageTitle: "1.7 HTTP", pageName: "A01Page" },
    { pageTitle: "2.2 模板语法", pageName: "A01Page" },
    { pageTitle: "2.3 生命周期钩子", pageName: "A01Page" },
    { pageTitle: "2.4 组件交互", pageName: "A01Page" },
    { pageTitle: "2.5 组件样式", pageName: "A01Page" },
    { pageTitle: "2.6 动态组件", pageName: "A01Page" },
    { pageTitle: "2.7 特性指令", pageName: "A01Page" },
    { pageTitle: "2.8 结构型指令", pageName: "A01Page" },
    { pageTitle: "2.9 管道", pageName: "A01Page" },
    { pageTitle: "2.10 动画", pageName: "A01Page" },
    { pageTitle: "3.2 模板驱动的表单", pageName: "A01Page" },
    { pageTitle: "3.3 表单验证", pageName: "A01Page" },
    { pageTitle: "3.4 响应式表单", pageName: "A01Page" },
    { pageTitle: "3.5 动态表单", pageName: "A01Page" },
  ];

  constructor(
    private platform:Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is("android")) {
      this.title = "(android)";
    } else if (this.platform.is("ios")) {
      this.title = "(ios)";
    } else if (this.platform.is("windows")) {
      this.title = "(windows)";
    }
  }

  itemSelected(pageName: string) {
    this.navCtrl.push(pageName);
  }

}
