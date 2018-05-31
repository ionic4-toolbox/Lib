import { IWord }    from "../../shared/interfaces/word.interface";

export interface IQuestion {
    rightAnswer: number,
    words: IWord[]
}