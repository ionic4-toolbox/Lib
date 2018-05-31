import { Component }                           from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController }                     from 'ionic-angular';
import { UserService }                         from '../../shared/services/user.service';
import { SettingsService }                     from '../../shared/services/settings.service';
import { StoreService }                        from '../../shared/services/store.service';
import { IUser }                               from '../../shared/interfaces/user.interface';
import { MainPage }                            from "../main/main";


@IonicPage()
@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html',
  providers: [ UserService, StoreService ]
})
export class LearnPage {
  isAndroid: boolean = false;
  scripts = [];
  user: IUser;
  showGame: boolean = false;
  DataArray: Array<string> = [];

  constructor(public alerCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService,
              private storeService: StoreService,
              private settingsService: SettingsService
  ){

  }

  ionViewDidLoad() {
    this.user = this.userService.getUser();
    this.getData();
  }

  getData(){
    this.settingsService.getScripts().then((scripts) => {
      this.scripts = scripts;
    });
    this.nextScript();
  }

  testRadioOpen: boolean;
  testRadioResult;

  nextScript(){
    this.user.scriptId = this.userService.setScriptId( ++this.user.scriptId );

    switch (this.user.scriptId){
      case 1:
        this.doRadio();
        break;
      case 2:
        this.showGame1()
        break;
    }
  }

  showGame1() {
    this.showGame = true;
  }

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Выберите свой уровень знания английского');

    alert.addInput({
      type: 'radio',
      label: 'Новичек',
      value: '0',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Знаю слабо',
      value: '1'
    });

    alert.addInput({
      type: 'radio',
      label: 'Знаю хорошо',
      value: '2'
    });

    alert.addInput({
      type: 'radio',
      label: 'Профи',
      value: '3'
    });

    alert.addButton({
      text: 'Отмена',
      handler: data => {
        this.navCtrl.push(MainPage, { })
        //this.user.baseExperience = data;
        //this.user.scriptId = this.userServ.setScriptId( this.user.scriptId++ );
      }
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userService.setBaseExperience(data);
        this.storeService.saveUserData();
        this.nextScript();
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
