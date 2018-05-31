import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class CommonController {
	public API_URL_LIST = "https://randomuser.me/api/";

	// public API_PRODUCT_URL = "https://www.addtobuy.com/api/";
	public API_PRODUCT_URL = "http://a2b.172.104.57.92.nip.io/api/";

	public API_URL_UPLOADS = "http://192.168.1.97:8400";
	// public API_URL_UPLOADS = "http://a2b.172.104.57.92.nip.io/api/updateprofile";

	public loader;
	public toast;

	constructor(
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {}

	showLoading(message) {
		this.loader = this.loadingCtrl.create({
			content: message
			// spinner: 'hide',
			// duration: 3000,
			// showBackdrop: true,
			// enableBackdropDismiss: true,
			// dismissOnPageChange: true
		});

		this.loader.onDidDismiss(() => {
			// console.log('Dismissed loading');
		});

		this.loader.present();
	}

	hideLoading() {
		this.loader.dismiss();
	}

	showToast(
		msg,
		position,
		duration,
		isShowCloseBtn,
		closeButtonText,
		hideOnPageChange
	) {
		if (isShowCloseBtn) {
			this.toast = this.toastCtrl.create({
				message: msg,
				position: position,
				duration: duration,
				showCloseButton: isShowCloseBtn,
				closeButtonText: closeButtonText,
				dismissOnPageChange: hideOnPageChange
			});
		} else {
			this.toast = this.toastCtrl.create({
				message: msg,
				position: position,
				duration: duration,
				dismissOnPageChange: hideOnPageChange
			});
		}

		this.toast.present();
	}

	hideToast() {
		this.toast.dismiss();
	}
}
