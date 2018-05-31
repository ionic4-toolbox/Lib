export interface CurrentTime {
    hour: string;
    minute: string;
}

export interface Sunrise {
    hour: string;
    minute: string;
}

export interface Sunset {
    hour: string;
    minute: string;
}

export interface Moonrise {
    hour: string;
    minute: string;
}

export interface Moonset {
    hour: string;
    minute: string;
}

export interface Astronomy {
    percentIlluminated: string;
    ageOfMoon: string;
    phaseofMoon: string;
    hemisphere: string;
    current_time: CurrentTime;
    sunrise: Sunrise;
    sunset: Sunset;
    moonrise: Moonrise;
    moonset: Moonset;
}