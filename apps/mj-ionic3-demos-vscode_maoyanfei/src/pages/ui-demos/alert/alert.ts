import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {

  //----radio alert----------//
  testRadioOpen: boolean;
  testRadioResult:any;

  //----checkbox-alert------//
  testCheckboxOpen: boolean;
  testCheckboxResult:any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  doBasicAlert() {
    let alert = this.alertCtrl.create({
      title: '有新邀请！',
      message: '你的朋友张三向你发送邀请，请回应！',
      buttons: ['确定']
    });
    alert.present()
  }

  doPromptAlert() {
    let prompt = this.alertCtrl.create({
      title: '登录',
      message: "请在下面的框中输入姓名",
      inputs: [ { name: 'title',  placeholder: '请输入姓名' }, ],
      buttons: [
        { text: '取消',  handler: data => { console.log('Cancel clicked:' + data); } },
        { text: '保存',  handler: data => { console.log('Saved clicked' + data); } }
      ]
    });
    prompt.present();
  }

  doConfirmAlert() {
    let confirm = this.alertCtrl.create({
      title: '用这光剑？',
      message: '你同意用这光剑在银河星系中做好事吗？',
      buttons: [
        { text: '不同意', handler: () => { console.log('Disagree clicked'); } },
        { text: '同意',   handler: () => { console.log('Agree clicked'); } }
      ]
    });
    confirm.present()
  }

  doRadioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('光剑颜色');
    alert.addInput({ type: 'radio',  label: 'Blue-蓝色',   value: 'blue',  checked: true });
    alert.addInput({ type: 'radio',  label: 'Green-绿色',  value: 'green' });
    alert.addInput({ type: 'radio',  label: 'Red-红色',    value: 'red'  });
    alert.addInput({ type: 'radio',  label: 'Yellow-黄色', value: 'yellow' });
    alert.addInput({ type: 'radio',  label: 'Purple-紫色', value: 'purple' });
    alert.addInput({ type: 'radio',  label: 'White-白色',  value: 'white' });
    alert.addInput({ type: 'radio',  label: 'Black-黑色',  value: 'black' });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present().then(() => { this.testRadioOpen = true; });
  }

  doCheckboxAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('你去过哪些星球？');
    alert.addInput({ type: 'checkbox', label: 'Alderaan', value: 'value1', checked: true });
    alert.addInput({ type: 'checkbox', label: 'Bespin', value: 'value2' });
    alert.addInput({ type: 'checkbox', label: 'Coruscant', value: 'value3' });
    alert.addInput({ type: 'checkbox', label: 'Endor',  value: 'value4' });
    alert.addInput({ type: 'checkbox', label: 'Hoth',  value: 'value5' });
    alert.addInput({ type: 'checkbox', label: 'Jakku', value: 'value6' });
    alert.addInput({ type: 'checkbox', label: 'Naboo',  value: 'value7' });
    alert.addInput({ type: 'checkbox', label: 'Takodana', value: 'value8' });
    alert.addInput({ type: 'checkbox', label: 'Tatooine',  value: 'value9' });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }
}
