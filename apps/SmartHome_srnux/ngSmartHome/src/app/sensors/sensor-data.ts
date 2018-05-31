import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ISensor } from './sensor';

export class SensorData implements InMemoryDbService {

    createDb() {
        //let sensors: ISensor[] = [
            let sensors: any = {
                "1": {
                    "state": {
                        "daylight": false,
                        "lastupdated": "2017-10-15T15:54:00"
                    },
                    "config": {
                        "on": true,
                        "configured": true,
                        "sunriseoffset": 30,
                        "sunsetoffset": -30
                    },
                    "name": "Daylight",
                    "type": "Daylight",
                    "modelid": "PHDL00",
                    "manufacturername": "Philips",
                    "swversion": "1.0"
                },
                "2": {
                    "state": {
                        "temperature": 1996,
                        "lastupdated": "2017-10-16T04:13:10"
                    },
                    "swupdate": {
                        "state": "noupdates",
                        "lastinstall": null
                    },
                    "config": {
                        "on": true,
                        "battery": 100,
                        "reachable": true,
                        "alert": "none",
                        "ledindication": false,
                        "usertest": false,
                        "pending": []
                    },
                    "name": "Hue temperature sensor 1",
                    "type": "ZLLTemperature",
                    "modelid": "SML001",
                    "manufacturername": "Philips",
                    "swversion": "6.1.0.18912",
                    "uniqueid": "00:17:88:01:02:11:5a:55-02-0402"
                },
                "3": {
                    "state": {
                        "presence": false,
                        "lastupdated": "2017-10-16T04:59:28"
                    },
                    "swupdate": {
                        "state": "noupdates",
                        "lastinstall": null
                    },
                    "config": {
                        "on": true,
                        "battery": 100,
                        "reachable": true,
                        "alert": "none",
                        "ledindication": false,
                        "usertest": false,
                        "sensitivity": 1,
                        "sensitivitymax": 2,
                        "pending": []
                    },
                    "name": "Hue motion sensor 1",
                    "type": "ZLLPresence",
                    "modelid": "SML001",
                    "manufacturername": "Philips",
                    "swversion": "6.1.0.18912",
                    "uniqueid": "00:17:88:01:02:11:5a:55-02-0406"
                },
                "4": {
                    "state": {
                        "lightlevel": 1563,
                        "dark": true,
                        "daylight": false,
                        "lastupdated": "2017-10-16T04:51:34"
                    },
                    "swupdate": {
                        "state": "noupdates",
                        "lastinstall": null
                    },
                    "config": {
                        "on": true,
                        "battery": 100,
                        "reachable": true,
                        "alert": "none",
                        "tholddark": 11897,
                        "tholdoffset": 7000,
                        "ledindication": false,
                        "usertest": false,
                        "pending": []
                    },
                    "name": "Hue ambient light sensor 1",
                    "type": "ZLLLightLevel",
                    "modelid": "SML001",
                    "manufacturername": "Philips",
                    "swversion": "6.1.0.18912",
                    "uniqueid": "00:17:88:01:02:11:5a:55-02-0400"
                },
                "5": {
                    "state": {
                        "status": 0,
                        "lastupdated": "2017-10-16T05:00:13"
                    },
                    "config": {
                        "on": true,
                        "reachable": true
                    },
                    "name": "MotionSensor 3.Companion",
                    "type": "CLIPGenericStatus",
                    "modelid": "PHA_STATE",
                    "manufacturername": "Philips",
                    "swversion": "1.0",
                    "uniqueid": "MotionSensor 3.Companion",
                    "recycle": true
                }
            };
        //     let sensors: any = [
        //     {id:1,
        //         "state": {
        //             "daylight": false,
        //             "lastupdated": "2017-10-15T15:54:00"
        //         },
        //         "config": {
        //             "on": true,
        //             "configured": true,
        //             "sunriseoffset": 30,
        //             "sunsetoffset": -30
        //         },
        //         "name": "Daylight",
        //         "type": "Daylight",
        //         "modelid": "PHDL00",
        //         "manufacturername": "Philips",
        //         "swversion": "1.0"
        //     },
        //     {
        //         id:2,
        //         "state": {
        //             "temperature": 1996,
        //             "lastupdated": "2017-10-16T04:13:10"
        //         },
        //         "swupdate": {
        //             "state": "noupdates",
        //             "lastinstall": null
        //         },
        //         "config": {
        //             "on": true,
        //             "battery": 100,
        //             "reachable": true,
        //             "alert": "none",
        //             "ledindication": false,
        //             "usertest": false,
        //             "pending": []
        //         },
        //         "name": "Hue temperature sensor 1",
        //         "type": "ZLLTemperature",
        //         "modelid": "SML001",
        //         "manufacturername": "Philips",
        //         "swversion": "6.1.0.18912",
        //         "uniqueid": "00:17:88:01:02:11:5a:55-02-0402"
        //     },
        //     {
        //         id:3,
        //         "state": {
        //             "presence": false,
        //             "lastupdated": "2017-10-16T04:59:28"
        //         },
        //         "swupdate": {
        //             "state": "noupdates",
        //             "lastinstall": null
        //         },
        //         "config": {
        //             "on": true,
        //             "battery": 100,
        //             "reachable": true,
        //             "alert": "none",
        //             "ledindication": false,
        //             "usertest": false,
        //             "sensitivity": 1,
        //             "sensitivitymax": 2,
        //             "pending": []
        //         },
        //         "name": "Hue motion sensor 1",
        //         "type": "ZLLPresence",
        //         "modelid": "SML001",
        //         "manufacturername": "Philips",
        //         "swversion": "6.1.0.18912",
        //         "uniqueid": "00:17:88:01:02:11:5a:55-02-0406"
        //     },
        //     {
        //         id:4,
        //         "state": {
        //             "lightlevel": 1563,
        //             "dark": true,
        //             "daylight": false,
        //             "lastupdated": "2017-10-16T04:51:34"
        //         },
        //         "swupdate": {
        //             "state": "noupdates",
        //             "lastinstall": null
        //         },
        //         "config": {
        //             "on": true,
        //             "battery": 100,
        //             "reachable": true,
        //             "alert": "none",
        //             "tholddark": 11897,
        //             "tholdoffset": 7000,
        //             "ledindication": false,
        //             "usertest": false,
        //             "pending": []
        //         },
        //         "name": "Hue ambient light sensor 1",
        //         "type": "ZLLLightLevel",
        //         "modelid": "SML001",
        //         "manufacturername": "Philips",
        //         "swversion": "6.1.0.18912",
        //         "uniqueid": "00:17:88:01:02:11:5a:55-02-0400"
        //     },
        //     {
        //         id:5,
        //         "state": {
        //             "status": 0,
        //             "lastupdated": "2017-10-16T05:00:13"
        //         },
        //         "config": {
        //             "on": true,
        //             "reachable": true
        //         },
        //         "name": "MotionSensor 3.Companion",
        //         "type": "CLIPGenericStatus",
        //         "modelid": "PHA_STATE",
        //         "manufacturername": "Philips",
        //         "swversion": "1.0",
        //         "uniqueid": "MotionSensor 3.Companion",
        //         "recycle": true
        //     }
        // ];
        return  {sensors} ;
    }
}
