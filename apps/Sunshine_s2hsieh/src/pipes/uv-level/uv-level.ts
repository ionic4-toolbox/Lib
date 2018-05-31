import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "uvLevel"
})
export class UvLevelPipe implements PipeTransform {
	transform(value: string | number) {
		if (value >= 11) {
			return "Extreme";
		} else if (value >= 8) {
			return "Very High";
		} else if (value >= 6) {
			return "High";
		} else if (value >= 3) {
			return "Moderate";
		} else if (value >= 0) {
			return "Low";
		} else {
			return "no data";
		}
	}
}
