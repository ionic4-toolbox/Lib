import { Injectable }  from '@angular/core';
import { Platform }    from 'ionic-angular';
import { Http }        from '@angular/http';
import { Toast }       from '@ionic-native/toast'

@Injectable()
export class SettingsService {
    platformName: string;
    http: Http;
    scripts: any[];

    constructor(private plt: Platform,
                http: Http,
                private toast: Toast)
    {
        this.http = http;
    }

    getPlatform(){
        this.plt.ready().then((source) => this.platformName = source);
    }

    /**
     * returns if platform is Android
     */
    isAndroid(): boolean {
       return this.platformName == 'android' || this.platformName == 'cordova';
    }

    getScripts():Promise<any[]> {

        if(this.scripts){
            return new Promise(resolve => resolve(this.scripts));
        }
        let url_path = (!this.isAndroid() ? './assets/data/scripts.json' : './assets/data/scripts.json' )
        return new Promise(resolve => {
            this.http.get(url_path)
                .map((res) => res.json())
                .subscribe(scripts => {
                    this.scripts = scripts;
                    resolve(this.scripts);
                }, (rej) => {
                    this.showError("Could not load local data", rej);
            });
        });
       // });
    }

    showError(msg: string, rej?){
        if (this.isAndroid()) {
            this.toast.show(msg, '5000', 'center').subscribe(toast => {});
        }
        else{
            console.error(msg, rej)
        }
    }

}