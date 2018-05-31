import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonicPage, NavController } from 'ionic-angular';

import { UserData } from '../../../providers/user-data';
import { UserOptions } from '../../../interfaces/user-options';

//import { TabsPage } from '../tabs/tabs';
//import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'login.html'
})
export class LoginPage {
    //见interfaces文件夹下UserOptions接口的定义
    login: UserOptions = { username: '', password: '' };
    submitted = false;

    constructor(public navCtrl: NavController, public userData: UserData) { }

    /**
     * 【登录】按钮的事件处理程序
     * @param form 表单
     */
    onLogin(form: NgForm) {
        this.submitted = true;

        if (form.valid) {
            this.userData.login(this.login.username);
            this.navCtrl.push('TabsPage');
        }
    }

    /**
     * 【注册】按钮的事件处理程序
     */
    onSignup() {
        this.navCtrl.push('SignupPage');
    }
}
