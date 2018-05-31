import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CookieService } from '../shared/services/cookie.service';
import { EnvironmentService } from '../shared/services/environment.service';
import {Observable} from 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { ISensor, State, Swupdate, Config } from './sensor';
import { environment } from '../../environments/environment'

import { INuPnPResponse } from 'app/shared/INuPnPResponse';

@Injectable()
export class SensorService {
    private bridgeIp= "192.168.178.56"
    private baseUrl:string;
    private hueUserToken:string;

    constructor(private http: Http, private cookieService:CookieService,private environmentService:EnvironmentService) { this.Init() }
    
    Init() {

        this.hueUserToken = this.cookieService.get('_hue_user_token');
        if(!this.hueUserToken){
            //todo: initialize user - set the cookie - hardcoded for now
            this.cookieService.set( '_hue_user_token', 'haKfNfJfRQqyRvdHO-2ub-u2Cp9jGKI7nExNquM1', 365 );
        }
    }

    getSensors(): Observable<ISensor[]> {
        console.log(this.baseUrl+ "sensors/")
        return this.http.get(this.baseUrl+ "sensors/")
            .map(this.extractData)
            .do(data => console.log('getSensors: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSensorsArray(): Observable<ISensor[]> {
        return this.environmentService.getBridgeIp().switchMap(
            NuPnPResponse => {
                return this.http.get(`http://${NuPnPResponse[0].internalipaddress}/api/${this.hueUserToken}/`+ "sensors/")
                    .map(this.extractArray)
                    .do(data => console.log('getSensorsArray: ' + JSON.stringify(data)))
                    .catch(this.handleError);
            }
        );
    }

    getSensor(id: number): Observable<ISensor> {
       return this.getSensors().map(sensors => sensors[id]);
    }

    deleteSensor(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteSensor: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // saveSensor(sensor: ISensor): Observable<ISensor> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });

    //     if (sensor.id === 0) {
    //         return this.createSensor(sensor, options);
    //     }
    //     return this.updateSensor(sensor, options);
    // }

    // private createSensor(sensor: ISensor, options: RequestOptions): Observable<ISensor> {
    //     sensor.id = undefined;
    //     return this.http.post(this.baseUrl, sensor, options)
    //         .map(this.extractData)
    //         .do(data => console.log('createSensor: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    // private updateSensor(sensor: ISensor, options: RequestOptions): Observable<ISensor> {
    //     const url = `${this.baseUrl}/${sensor.id}`;
    //     return this.http.put(url, sensor, options)
    //         .map(() => sensor)
    //         .do(data => console.log('updateSensor: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    private extractData(response: Response) {
        let body = response.json();

        return body.data || {};
    }

    private extractArray(response: Response) {
        let body = response.json();

        // Object.keys(body).forEach(function(key) {
        //     console.log(key + ': ' + body[key]);
        // });
        return Object.keys(body).map(function(key) { 
            body[key].id=key;
            return body[key]; 
        }) || {};
        //return body || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeSensor(): ISensor {
        // Return an initialized object
        return {
            id:0,
            state: <State>{},
            swupdate: <Swupdate>{},
            config: <Config>{},
            name: "",
            type: "",
            modelid: "",
            manufacturername: "",
            swversion: "",
            uniqueid: ""
        };
    }
}
