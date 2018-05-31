import { Place } from "./IPlace";
import { Degree, Speed, Volume, Pressure, Distance } from "../providers/strings";

export interface Pref {
    degree: Degree,
    speed: Speed,
    volume: Volume,
    pressure: Pressure,
    distance: Distance,
    locations: Place[],
    icon: number
}