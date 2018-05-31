import { Component } from '@angular/core';
import {IonicPage, AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../../providers/user-data';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    username: string;

    constructor(
        public alertCtrl: AlertController,
        public nav: NavController,
        public userData: UserData) {
    }

    /**
     * 视图初始化完成后获取用户名
     */
    ngAfterViewInit() {
        this.getUsername();
    }

    /**
     * 更新照片
     */
    updatePicture() {
        console.log('单击了更新照片');
    }

    /**
     * 用alert显示当前填充的用户名。单击【OK】将更新用户名并显示，单击【Cancel】直接关闭alert。
     */
    changeUsername() {
        let alert = this.alertCtrl.create({
            title: '修改用户名',
            buttons: [
                '取消'
            ]
        });
        alert.addInput({
            name: '用户名',
            value: this.username,
            placeholder: '请输入用户名'
        });
        alert.addButton({
            text: '确定',
            handler: (data: any) => {
                this.userData.setUsername(data.username);
                this.getUsername();
            }
        });
        alert.present();
    }

    /**
     * 获取用户名
     */
    getUsername() {
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
    }

    /**
     * 修改密码
     */
    changePassword() {
        console.log('单击了修改密码');
    }

    /**
     * 退出登录
     */
    logout() {
        this.userData.logout();
        this.nav.setRoot('LoginPage');
    }

    /**
     * 显示个人信息（support）页
     */
    support() {
        this.nav.push('SupportPage');
    }
}
