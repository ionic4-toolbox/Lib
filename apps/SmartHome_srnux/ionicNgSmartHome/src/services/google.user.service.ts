import { Injectable, NgZone } from "@angular/core";
import { GoogleAuthService } from "../app/gapi/GoogleAuthService";
import { GoogleMailService } from "../app/gapi/GoogleMailService";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import Message = gapi.client.gmail.Message;
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { IUser } from "./user";

@Injectable()
export class GoogleUserService {
	public static readonly SESSION_STORAGE_KEY: string = "accessToken";
	public user: IUser = {
		id: "",
		name: "",
		email: "",
		familyName: "",
		givenName: "",
		accessToken: "",
		imageUrl: "",
		token: "",
		threadsTotal: 0,
		historyId: 0,
		messagesTotal: 0
	};
	private messages: Message[];
	constructor(
		private googleAuthService: GoogleAuthService,
		private googleMailService: GoogleMailService
	) {}

	public getCurrentUser(): Observable<IUser> {
		return this.googleMailService
			.getMailClient()
			.mergeMap(() => this.googleMailService.getUserProfile());
	}

	public getMessages(query?: string): Observable<Message[]> {
		return this.googleMailService
			.getMailClient()
			.mergeMap(() => this.googleMailService.getMessages(query));
	}

	public getToken(): string {
		let token: string = sessionStorage.getItem(
			GoogleUserService.SESSION_STORAGE_KEY
		);
		if (!token) {
			throw new Error("no token set , authentication required");
		}
		return sessionStorage.getItem(GoogleUserService.SESSION_STORAGE_KEY);
	}

	public signIn(): Observable<IUser> {
		return this.googleAuthService.getAuth().switchMap(auth => {
			return auth
				.signIn()
				.then(
					res => this.signInSuccessHandler(res),
					err => this.signInErrorHandler(err)
				);
		});
	}

	// private extractData(response: Response) {
	//     let body = response.json();

	//     return body || {};
	// }

	// private handleError(error: Response): Observable<any> {
	//     // in a real world app, we may send the server to some remote logging infrastructure
	//     // instead of just logging it to the console
	//     console.error(error);
	//     return Observable.throw(error.json() || 'Server error');
	// }

	//TODO: Rework
	public signOut(): void {
		this.googleAuthService.getAuth().subscribe(auth => {
			try {
				auth.signOut();
			} catch (e) {
				console.error(e);
			}
			sessionStorage.removeItem(GoogleUserService.SESSION_STORAGE_KEY);
		});
	}

	public isUserSignedIn(): boolean {
		return (
			sessionStorage.getItem(GoogleUserService.SESSION_STORAGE_KEY)
				.length > 0
		);
	}

	private signInSuccessHandler(googleUser: GoogleUser) {
		((u, p) => {
			u.id = p.getId();
			u.name = p.getName();
			u.email = p.getEmail();
			u.imageUrl = p.getImageUrl();
			u.givenName = p.getGivenName();
			u.familyName = p.getFamilyName();
		})(this.user, googleUser.getBasicProfile());

		((u, r) => {
			u.token = r.id_token;
			u.accessToken = r.access_token;
		})(this.user, googleUser.getAuthResponse());

		sessionStorage.setItem(
			GoogleUserService.SESSION_STORAGE_KEY,
			this.user.accessToken
		);

		// return this.googleMailService.getMailClient().mergeMap(()=> this.googleMailService.getUserProfile()).subscribe((mail)=>{
		//         try {
		//             this.user.threadsTotal=mail.threadsTotal;
		//             this.user.messagesTotal= mail.messagesTotal;
		//             this.user.historyId = mail.historyId;
		//         } catch (e) {
		//             console.error(e);
		//         }
		// })
	}

	private signInErrorHandler(err) {
		console.warn(err);
	}
}
