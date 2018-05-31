import { IQuestion } from "./question.interface";

export interface IGame {
    questions: IQuestion[],
    rightAnswerCount: number,
    askedCount: number,
    seconds: number
}