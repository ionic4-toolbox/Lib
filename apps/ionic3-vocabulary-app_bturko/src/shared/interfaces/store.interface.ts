import {IUser} from "./user.interface";
import {IWord} from "./word.interface";

export interface IStore {
    user: IUser,
    userVocabulary: IWord[]
}