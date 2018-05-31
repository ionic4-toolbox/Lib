export interface IWord {
    id: number,
    text: string,
    translation: string,
    transcription: string,
    lang: string,
    level: number,
    transLang: string,
    category: string,
    status: number // 1-user learnt it
}