import { Injectable }      from '@angular/core';
import { ICategory }       from '../interfaces/category.interface';
import { Http }            from '@angular/http';
import { SettingsService } from './settings.service';

@Injectable()
export class CategoriesService {
    http: Http;
    categories: ICategory[];
    platformName: string;

    constructor (http: Http, private settingsService: SettingsService) {
       this.http = http;
    }

    /**
     * Returns categories list
     * @returns {Promise<T>}
     */
    getCategories():Promise<ICategory[]>{
        if(this.categories){
            return new Promise(resolve => resolve(this.categories));
        }
        else{
            let url_path;
            url_path = !this.settingsService.isAndroid() ? './assets/data/categories.json' : './assets/data/categories.json';
            return new Promise(resolve => {
                this.http.get(url_path)
                    .map((res) => res.json())
                    .subscribe(data => {
                        this.categories = data;
                        resolve(this.categories);
                    }, (rej) => {console.error("Could not load local data",rej)});
            });
        }
    }

}