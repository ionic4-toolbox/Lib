import { Component } from '@angular/core';
import {Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

//百度地图API需要先这样声明一下，声明以后就可以使用了
declare let BMap: any;

@IonicPage()
@Component({
  selector: 'page-map-demos',
  templateUrl: 'map-demos.html',
})
export class MapDemosPage {

  title: string;

  constructor(
    private platform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is("android")) { this.title = "(android)"; }
    else if (this.platform.is("ios")) { this.title = "(ios)"; }
    else if (this.platform.is("windows")) { this.title = "(windows)"; }
  }

  ionViewDidLoad() {
    // 创建百度地图API的Map实例
    let map = new BMap.Map('map');
    // 初始化地图,设置中心点坐标（河大计算机学院门前路上）和地图级别（11）
    map.centerAndZoom(new BMap.Point(114.315745, 34.824635), 11);
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity("开封");
    //开启鼠标滚轮缩放，默认false
    map.enableScrollWheelZoom(true);
  }
}
