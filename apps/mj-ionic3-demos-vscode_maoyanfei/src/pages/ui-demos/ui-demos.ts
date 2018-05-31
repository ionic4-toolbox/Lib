import { Component } from '@angular/core';
import {Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

export class DemoInfo{
  titleName:string;
  pageName:string;
}

@IonicPage()
@Component({
  selector: 'page-ui-demos',
  templateUrl: 'ui-demos.html',
})
export class UiDemosPage {
  title: string;
  demos:DemoInfo[]=[
    { titleName:"action sheets【操作表】", pageName:"ActionSheetsPage"},
    { titleName:"alert【警告对话框】", pageName:"AlertPage"},
    { titleName: "avatar【头像】", pageName: "AvatarPage" },
    { titleName: "badge【徽章】", pageName: "BadgePage" },
    { titleName: "button【按钮】", pageName: "ButtonPage" },
    { titleName: "card【卡片】", pageName: "CardPage" },
    { titleName: "Checkbox【复选框】", pageName: "CheckboxPage" },
    { titleName: "Chip【晶片】", pageName: "ChipPage" },
    { titleName: "DateTime【日期与时间】", pageName: "DatetimePage" },
    { titleName: "Fab【晶圆按钮】", pageName: "FabPage" },
    { titleName: "Gestures【手势】", pageName: "GesturesPage" },
    { titleName: "Grid【网格】", pageName: "GridPage" },
    { titleName: "icons【图标】", pageName: "IconsPage" },
    { titleName: "Inputs【输入】", pageName: "InputsPage" },
    { titleName: "Lists【列表】", pageName: "ListsPage" },
    { titleName: "Loading【加载提示】", pageName: "LoadingPage" },
    { titleName: "Modals【】", pageName: "ModalsPage" },
    { titleName: "Navigation【导航】", pageName: "NavigationPage" },
    { titleName: "Navbar【导航栏】", pageName: "CardPage" },
    { titleName: "NavPop【导航弹出】", pageName: "CardPage" },
    { titleName: "Option【下拉选项】", pageName: "CardPage" },
    { titleName: "Platform【平台服务】", pageName: "CardPage" },
    { titleName: "Popover【覆盖式弹出】", pageName: "PopoverPage" },
    { titleName: "Radios【单选】", pageName: "RadiosPage" },
    { titleName: "Ranges【滑动选择】", pageName: "RangesPage" },
    { titleName: "Scroll【滚动】", pageName: "CardPage" },
    { titleName: "Searchbar【搜索栏】", pageName: "CardPage" },
    { titleName: "Segments【段】", pageName: "SegmentsPage" },
    { titleName: "Selects【选择项】", pageName: "SelectsPage" },
    { titleName: "Slides【幻灯片】", pageName: "SlidesPage" },
    { titleName: "Thumbnail【缩略图】", pageName: "CardPage" },
    { titleName: "Toast【信息提示】", pageName: "ToastPage" },
    { titleName: "Toggles【状态切换】", pageName: "TogglesPage" },
    { titleName: "Toolbar【工具栏】", pageName: "ToolbarPage" },
    { titleName: "Typography【排版文字】", pageName: "CardPage" },
  ];

  constructor(
    private platform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is("android")) {
      this.title = "(android)";
    } else if (this.platform.is("ios")) {
      this.title = "(ios)";
    } else if (this.platform.is("windows")) {
      this.title = "(windows)";
    }
  }

  itemSelected(pageName:string){
    this.navCtrl.push(pageName);
  }

}
