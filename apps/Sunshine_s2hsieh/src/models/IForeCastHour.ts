export interface Hour {
    hour: string;
    hour_padded: string;
    min: string;
    min_unpadded: string;
    sec: string;
    year: string;
    mon: string;
    mon_padded: string;
    mon_abbrev: string;
    mday: string;
    mday_padded: string;
    yday: string;
    isdst: string;
    epoch: string;
    pretty: string;
    civil: string;
    month_name: string;
    month_name_abbrev: string;
    weekday_name: string;
    weekday_name_night: string;
    weekday_name_abbrev: string;
    weekday_name_unlang: string;
    weekday_name_night_unlang: string;
    ampm: string;
    tz: string;
    age: string;
    UTCDATE: string;
}

export interface Temp {
    english: string;
    metric: string;
}

export interface Dewpoint {
    english: string;
    metric: string;
}

export interface Wspd {
    english: string;
    metric: string;
}

export interface Wdir {
    dir: string;
    degrees: string;
}

export interface Windchill {
    english: string;
    metric: string;
}

export interface Heatindex {
    english: string;
    metric: string;
}

export interface Feelslike {
    english: string;
    metric: string;
}

export interface Qpf {
    english: string;
    metric: string;
}

export interface Snow {
    english: string;
    metric: string;
}

export interface Mslp {
    english: string;
    metric: string;
}

export interface ForecastHour {
    FCTTIME: Hour;
    temp: Temp;
    dewpoint: Dewpoint;
    condition: string;
    icon: string;
    icon_url: string;
    fctcode: string;
    sky: string;
    wspd: Wspd;
    wdir: Wdir;
    wx: string;
    uvi: string;
    humidity: string;
    windchill: Windchill;
    heatindex: Heatindex;
    feelslike: Feelslike;
    qpf: Qpf;
    snow: Snow;
    pop: string;
    mslp: Mslp;
}