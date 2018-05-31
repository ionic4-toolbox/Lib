import { IWord }    from "../../shared/interfaces/word.interface";

export interface IQuestionEntity {
    rightAnswer: number,
    words: IWord[]
}