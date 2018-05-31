import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ISamurai, Samurai } from './samurai.model';

@Injectable()
export class SamuraiService {
    private samuraiUrl = 'http://localhost:11083/api/samurai';//'api/samurai';
    constructor(private http: Http) {}
    
    getSamurais(): Observable<Samurai[]> {
        return this.http
            .get(this.samuraiUrl)
            .map(
                (r: Response) => r.json() as Samurai[]
            )
            .catch((error: any) =>
                Observable.throw(error.json().error || 'Server error')
            );
    }

    getSamurai(id: number): Promise<Samurai> {
        return this.getSamurais()
                .toPromise().then(samurais => 
                samurais.find(hero => hero.id === id));
        //return this.getSamurais().then(samurais =>
        //        samurais.find(hero => hero.id === id));
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Samurai): Promise<Samurai> {
        const url = `${this.samuraiUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Samurai> {
        return this.http
            .post(
                this.samuraiUrl, 
                JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.samuraiUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
