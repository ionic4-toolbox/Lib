import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "iconSet"
})
export class IconSetPipe implements PipeTransform {
	transform(url: string, setNum: number) {
		// setNum is not of type number in reality
		let setString = `/${String.fromCharCode(+setNum + 96)}/`;
		return url.replace("/k/", setString);
	}
}
