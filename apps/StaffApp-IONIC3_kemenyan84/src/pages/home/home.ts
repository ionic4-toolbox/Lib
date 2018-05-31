import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetailsPage } from '../details/details';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  staffList: Array<any>;

  constructor(public navCtrl: NavController, public webservice: WebserviceProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.staffList = []
  }

  ionViewDidLoad(){
    let loader = this.loadingCtrl.create({
      //content: "Sila Tunggu...",
      spinner: 'dots'
      //duration: 3000
    });
    loader.present();

    this.webservice.getEmployee().then(response => {
      console.log(response);
      this.staffList = response.person;
      loader.dismiss();
    }).catch(error => {
      alert('Error' + error);
    });
  }

  detailsPage(item: any){
    this.navCtrl.push(DetailsPage, {item: item});
  }

  pageAdd(){
    let modal = this.modalCtrl.create(AddPage);
    modal.present();

    modal.onDidDismiss( employee => {
      if(employee){
        this.webservice.saveEmployee(employee).then(response => {
          console.log('Message: ' + JSON.stringify(response)); //response dlm bentuk JSON --> stringify convert to string - senang debug
        })
      } 
    });
  }
}
/*
    .catch(error => {
      alert('Error: ' + error);//error handling
*/
