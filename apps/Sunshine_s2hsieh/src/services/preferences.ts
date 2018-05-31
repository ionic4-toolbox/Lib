import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage";
import { Pref } from "../models/IPref";
import {
	Distance,
	Speed,
	Pressure,
	Volume,
	Degree,
	EVENTS
} from "../providers/strings";
import { Events } from "ionic-angular/util/events";

@Injectable()
export class PreferencesService {
	private readonly default: Pref = {
		distance: Distance.metric,
		speed: Speed.metric,
		pressure: Pressure.metric,
		volume: Volume.metric,
		degree: Degree.metric,
		locations: [],
		icon: 11
	};

	constructor(private nativeStorage: NativeStorage, private event: Events) {}

	initialize() {
		this.nativeStorage
			.getItem("pref")
			.then(pref => {
				this.event.publish(EVENTS.init, pref);
			})
			.catch(err => {
				if (err.code == 2 || err.code.code == 2) {
					this.nativeStorage
						.setItem("pref", this.default)
						.then(pref => {
							console.log("initialize preferences");
							this.event.publish(EVENTS.init, pref);
						});
				} else {
					console.log(err);
				}
			});
	}

	getPref(): Promise<Pref> {
		return this.nativeStorage.getItem("pref").catch(this.handleError);
	}

	setPref(save: Pref) {
		return this.nativeStorage.setItem("pref", save).catch(this.handleError);
	}

	private handleError(err) {
		console.log(err);
	}
}
