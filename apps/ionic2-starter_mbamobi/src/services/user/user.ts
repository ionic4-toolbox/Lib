import { Injectable } from '@angular/core';
import { Http } from '@mbamobi/http';
import { UserModel } from './user.model';

export {
  UserModel
};

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getAll(): Promise<any> {
    let observable = this.http.get('usuarios');
    return new Promise((resolve, reject) => {
      observable.subscribe(res => {
        resolve(res.json());
      }, error => {
        reject(error);
      });
    });
  }

  get(cpf: number): Promise<any> {
    let observable = this.http.get('usuarios', { cpf });

    return new Promise((resolve, reject) => {
      observable.subscribe(res => {
        resolve(res.json());
      }, error => {
        reject(error);
      });
    });
  }

  list(): Promise<UserModel[]> {
    return this.getAll().then((dataJson) => {
      let users: Array<UserModel> = [];

      for (let user of dataJson) {
        users.push(new UserModel(user));
      }

      return users;
    });
  }

  detail(id: number): Promise<UserModel> {
    return this.get(id).then((dataJson) => {
      return new UserModel(dataJson);
    });
  }
}
