export enum Feature {
	now = "conditions",
	three = "forecast",
	ten = "forecast10day",
	hourly = "hourly10day",
	loc = "geolookup",
	extra = "astronomy"
}

export enum CurrentView {
	default = "forecast",
	extra = "astronomy"
}

export enum Distance {
	metric = "km",
	imperial = "mi"
}

export enum Speed {
	metric = "km/h",
	imperial = "mi/h"
}

export enum Pressure {
	metric = "mb",
	imperial = "in"
}

export enum Volume {
	metric = "cm",
	imperial = "in"
}

export enum Degree {
	metric = "Celsius",
	imperial = "Fahrenheit "
}

export enum Observation {
	temp,
	wind,
	precip,
	pressure,
	visibility
}

export const IconSetList = [6, 7, 8, 9, 10, 11];

export enum EVENTS {
	init = "initialized preferences",
	change = "changed preferences",
	gps = "GPS location",
	search = "returned location search"
}

export enum KEYS {
	weatherUnderground = "1760644cb1b2f8da",
	bingMaps = "Au59ZRQJvN8hb2HiQpgzuGzxKOab4hVhR64mV_DEnWRhKOMmGohCHcUYIkLTKAxf"
}
