/* The date format shown below uses the ISO 8601 datetime standard
    as specified in the ionic framework, DateTime documentation.
 */

//Define interface for a single weight entry
export interface WeightEntry {
     date: string;
     weight: number;
}

export const WEIGHTS: WeightEntry[] = [
    {date: '2017-11-13', weight: 100.8},
    {date: '2017-11-14', weight: 100.8},
    {date: '2017-11-15', weight: 100.8},
    {date: '2017-11-16', weight: 100.8},
    {date: '2018-11-17', weight: 101.4}
];
