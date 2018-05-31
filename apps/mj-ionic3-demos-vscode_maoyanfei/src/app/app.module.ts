import { TabsPageModule } from './../pages/tabs/tabs.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

//导入providers文件夹下的类
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

//当调试没有问题后，注释掉下面这条语句，以便在生产模式下运行，这样可加快项目的编译速度。
enableProdMode();

//装饰器类，负责描述元数据对象
@NgModule({
    declarations: [ MyApp ],
    imports: [
        BrowserModule,
        HttpModule,
        TabsPageModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {
            backButtonText: '后退',
            iconMode: 'md',  //可选值：ios,md,wp。ios和android默认使用不同的图标。
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',    //Windows默认'top'
            tabsHideOnSubPages: false,  //windows默认true，android和ios默认false
            pageTransition: 'md-transition' //可选值：ios,md,wp
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [ MyApp ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ConferenceData, UserData,
        InAppBrowser,
        SplashScreen,
    ]
})
export class AppModule { }
