import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";

declare const ENV: any;

@Injectable()
export class Api {
	url: string = ENV.API_URL;

	constructor(public http: Http) {}

	get(endpoint: string, params?: any, options?: RequestOptions) {
		console.log("API::get url=" + this.url + ", endpoint=" + endpoint + ", params=" + params);

		if (!options) {
			options = new RequestOptions();
		}

		if (params) {
			let p = new URLSearchParams();
			for (let k in params) {
				p.set(k, params[k]);
			}
			options.search = (!options.search && p) || options.search;
		}

		return this.http
			.get(this.url + "/" + endpoint, options)
			.map(res => res.json())
			.catch((error: any) => this.handleError(error));
	}

	private handleError(error: any): Observable<Error> {
		if (error.json) {
			return Observable.throw(error.json());
		} else {
			return Observable.throw(error);
		}
	}

	post(
		endpoint: string,
		body: any,
		options?: RequestOptions
	): Observable<any> {
		console.log(
			"API::post url=" +
				this.url +
				", endpoint=" +
				endpoint +
				", body=" +
				body
		);

		return this.http
			.post(this.url + "/" + endpoint, body, options)
			.map(res => res.json())
			.catch((error: any) => this.handleError(error));
	}

	put(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.put(this.url + "/" + endpoint, body, options);
	}

	delete(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.post(this.url + "/" + endpoint, body, options);
	}

	patch(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.put(this.url + "/" + endpoint, body, options);
	}
}
