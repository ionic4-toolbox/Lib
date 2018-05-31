import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VocabularyPage }           from '../vocabulary/vocabulary';
import { LearnPage }                from '../learn/learn';
import { InAppBrowser,
         InAppBrowserOptions }      from '@ionic-native/in-app-browser';
import { SettingsService }          from "../../shared/services/settings.service";


@Component({
  selector: 'page-posts',
  templateUrl: 'main.html'
})
export class MainPage {

  loadCompleted: boolean = false;
  subreddit;
  menuItems = [];
  browser;
  options : InAppBrowserOptions = {
    location : 'yes',
    hidden : 'no',
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
  };
  image;
  fullAppUrl: string = "http://google.com/";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private theInAppBrowser: InAppBrowser,
              settingsService: SettingsService
  ) {
    //this.subreddit = this.navParams.get('subreddit');
    this.image = 'https://randomuser.me/api/portraits/women/79.jpg';
    settingsService.getPlatform();
    this.menuItems = [
      {
        'title': 'Учить',
        'icon': 'pie',
        'description': '',
        'color': '#0CA9EA'
      },
      {
        'title': 'Словарь',
        'icon': 'school',
        'description': 'l',
        'color': '#E63135'
      },
      {
        'title': 'Статистика',
        'icon': 'stats',
        'description': '',
        'color': '#ea6d1e'
      },
      {
        'title': 'Полная версия',
        'icon': 'cloud',
        'description': '',
        'color': '#ea6d1e'
      }
    ]
 }

  getPostImage(post) {
   let postImage = '';
   if (!post.imageError && post.preview) {
     postImage = post.preview.images[0].source.url;
   }
   return postImage;
  }

  setImageError(post) {
    post.imageError = true;
  }


  goToPost(post) {
    window.open(post.url, '_blank');
  }

  goToSubreddit(subreddit) {
    this.navCtrl.push(MainPage, {subreddit})
  }

  // loadMore(infiniteScroll) {
  //   let lastPost = this.posts[this.posts.length - 1];
  //   if (!lastPost) {
  //     infiniteScroll.complete()
  //   } else {
  //
  //   }
  // }

  openNavDetailsPage(item) {
    switch (item.icon){
      case "pie":
        this.navCtrl.push(LearnPage, { val: item.icon })
        break;
      case "school":
        this.navCtrl.push(VocabularyPage, { val: item.icon })
        break;
      case "stats":
        this.navCtrl.push(VocabularyPage, { val: item.icon })
        break;
      case "cloud":
        this.openWithInAppBrowser(this.fullAppUrl);
        break;
    }

  }

  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
  }

}
