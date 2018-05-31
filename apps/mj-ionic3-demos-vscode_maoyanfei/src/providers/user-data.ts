import { Injectable } from "@angular/core";

import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class UserData {
	_favorites: string[] = [];
	HAS_LOGGED_IN = "hasLoggedIn";
	HAS_SEEN_TUTORIAL = "hasSeenTutorial";

	constructor(public events: Events, public storage: Storage) {}

	/**
	 * 检查是否为喜欢的分会场
	 * @param sessionName 分会场名称
	 */
	hasFavorite(sessionName: string): boolean {
		return this._favorites.indexOf(sessionName) > -1;
	}

	/**
	 * 添加喜欢的分会场
	 * @param sessionName 分会场名称
	 */
	addFavorite(sessionName: string): void {
		this._favorites.push(sessionName);
	}

	/**
	 * 移除喜欢的分会场
	 * @param sessionName 分会场名称
	 */
	removeFavorite(sessionName: string): void {
		let index = this._favorites.indexOf(sessionName);
		if (index > -1) {
			this._favorites.splice(index, 1);
		}
	}

	/**
	 * 登录
	 * @param username 用户名
	 */
	login(username: string): void {
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setUsername(username);
		this.events.publish("user:login");
	}

	/**
	 * 注册
	 * @param username 用户名
	 */
	signup(username: string): void {
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setUsername(username);
		this.events.publish("user:signup");
	}

	/**
	 * 退出登录。
	 */
	logout(): void {
		this.storage.remove(this.HAS_LOGGED_IN);
		this.storage.remove("username");
		this.events.publish("user:logout");
	}

	/**
	 * 存储用户名。
	 * @param username 用户名
	 */
	setUsername(username: string): void {
		this.storage.set("username", username);
	}

	/**
	 * 从存储中获取用户名。
	 */
	getUsername(): Promise<string> {
		return this.storage.get("username").then(value => {
			return value;
		});
	}

	/**
	 * 判断是否已登录，若是则为true。
	 */
	hasLoggedIn(): Promise<boolean> {
		return this.storage.get(this.HAS_LOGGED_IN).then(value => {
			return value === true;
		});
	}

	/**
	 * 检查是否已看过4个界面的启动教程，若是，则为true。
	 */
	checkHasSeenTutorial(): Promise<string> {
		return this.storage.get(this.HAS_SEEN_TUTORIAL).then(value => {
			return value;
		});
	}
}
