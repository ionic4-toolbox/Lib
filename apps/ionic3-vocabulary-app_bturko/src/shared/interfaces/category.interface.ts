export interface ICategory {
    id: number,
    name: string,
    imgPath: string,
    firstEntry: boolean, //true - need show all words for acquaintance
    enabled: boolean,
    order: number
}