import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Refresher } from "ionic-angular";
import { SensorService } from "../../services/sensor.service";
import { ISensor } from "../../services/sensor";

@Component({
	templateUrl: "temperature.html"
})
export class Temperature {
	motion: any;
	illuminance: number;
	brightness: number = 20;
	contrast: number = 0;
	warmth: number = 1300;
	structure: any = { lower: 33, upper: 60 };
	text: number = 0;
	temperature: number = 0.0;

	private sensors: ISensor[];

	constructor(
		public navCtrl: NavController,
		public sensorService: SensorService
	) {
		this.Init();
	}

	Init(refresher?: Refresher) {
		this.sensorService
			.getSensorsArray()
			.subscribe(x => this.getTemperature(x, refresher));
	}

	getTemperature(sensors: ISensor[], refresher?: Refresher) {
		for (let sensor of sensors) {
			if (sensor.name.includes("temperature")) {
				this.temperature = sensor.state.temperature / 100;
			}
			if (sensor.name.includes("light")) {
				this.illuminance = sensor.state.lightlevel;
			}
			if (sensor.name.includes("motion")) {
				this.motion = sensor.state.presence;
			}
		}
		this.sensors = sensors;

		if (refresher) refresher.complete();
	}

	doRefresh(refresher) {
		this.Init(refresher);
	}
}
