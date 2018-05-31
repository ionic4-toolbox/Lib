import { Injectable } from '@angular/core';
import { IUser }      from '../interfaces/user.interface'

@Injectable()
export class UserService {
    user = {
        wordsLevel: 0,
        scriptId: 0,
        baseExperience: 0,
        availableCategories: []
    };

    getUser(): IUser {
        return this.user;
    }

    setScriptId(scriptId:number): number {
        this.user.scriptId = scriptId;
        return this.user.scriptId;
    }

    setBaseExperience(expLevel: number): void{
        this.user.baseExperience = expLevel;
    }

    setAvailableCategories(cats: number[]): void{
        this.user.availableCategories = cats;
    }
}