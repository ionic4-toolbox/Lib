import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';//untuk .map
import 'rxjs/add/operator/timeout';//utk timeout

/*
  Generated class for the WebserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebserviceProvider {

  baseURL: string = 'http://appsmalaya.com/webservices';

  constructor(public http: Http, public http2: HttpClient) {
    console.log('Hello WebserviceProvider Provider');
  }

  getEmployee(): Promise<any>{

    let header = new Headers ({
      'Content-Type':'text/plain' //ambik data daripada header yg bentuk text/plain
    })

    let options = new RequestOptions({headers: header});
    let fullURL = this.baseURL + '/output.php';

    return new Promise((resolve, reject) => { //Promise : tunggu dapatkan data
      this.http.get(fullURL, options)
      .timeout(30000) // 1 saat = 10,000 milisecond
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); //success - biasa dlm 2 minit
        
        /*
        if(data.message == "Data tidak ditemui!"){
          reject(data.message);
        }
        */
      }), error => {
        reject(error);
      }

    })

  }

  saveEmployee(employee: any): Promise<any>{
    let body = JSON.stringify(employee);
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    let URL = this.baseURL + '/createprofile.php';

    return new Promise((resolve, reject) => {
      this.http2.post(URL, body, {
        headers: header
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    }); //end of promise

  } //end of save employee

}
