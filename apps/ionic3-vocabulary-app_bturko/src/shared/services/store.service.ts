import { Injectable }    from '@angular/core';
import { IStore }        from "../interfaces/store.interface";
import { UserService }   from './user.service'
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast }         from '@ionic-native/toast';
import { Platform }      from 'ionic-angular';
import { IUser }         from "../interfaces/user.interface";

@Injectable()
export class StoreService {
    platformName: string;

    constructor (private userService: UserService, private nativeStorage: NativeStorage,
                 private toast: Toast,
                 private platform: Platform
    ) {
        this.userService = userService;
        platform.ready().then((source) => {
            this.platformName = source;
        });
    }

    loadUserData(): IStore {
        let user = this.userService.getUser();
        let store = {
            user: user,
            userVocabulary: []
        }

        this.nativeStorage.getItem('myitem')
            .then(
                store => {
                    console.log('Stored item!', store)
                    return store;
                },
                error => {
                    console.log("Can't get item!")
                    //this.toast.show(`Can't get item!`, '5000', 'center').subscribe(toast => {});
                }
            );
        return store; //TODO: not good!

    }

    saveUserData(): void {
        let user: IUser = this.userService.getUser();

        if (this.platform.is('android')) {

        }

        this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
            .then(
                () => {
                    console.log('Stored item!');
                    //this.toast.show(`Stored item!`, '5000', 'center').subscribe(toast => {});
                },
                error => {
                    console.error('Error storing item', error);
                    //this.toast.show(`NOT Stored!`, '5000', 'center').subscribe(toast => {});
                }
            );

    }
}