import { Component, ViewChild } from "@angular/core";

import { Events, MenuController, Nav, Platform } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";

import { Storage } from "@ionic/storage";

//providers
import { ConferenceData } from "../providers/conference-data";
import { UserData } from "../providers/user-data";

export interface PageInterface {
	/**页标题*/
	title: string;

	/**页名称*/
	name: string;

	/**页的组件名称*/
	//component: any;

	/**页组件的图标名称*/
	icon: string;

	/**是否已经退出登录（true：已退出）*/
	logsOut?: boolean;

	/** *tabs序号*/
	index?: number;

	/** *tabs序号对应的组件名称，例如tab1Page */
	tabName?: string;

	/**tabs组件的名称*/
	tabComponent?: any;
}

@Component({
	templateUrl: "app.html"
})
export class MyApp {
	// root下的nav是app组件的子页，@ViewChild(Nav)用于获取app中对nav的引用
	@ViewChild(Nav) nav: Nav;

	//----------------------------------------------------------------------
	// 可通过menu导航的页列表，登录时禁用menu。
	//----------------------------------------------------------------------
	/** 登录后可浏览的页*/
	loggedInPages: PageInterface[] = [
		{ title: "账户", name: "AccountPage", icon: "person" },
		{ title: "个人信息", name: "SupportPage", icon: "help" },
		{ title: "退出登录", name: "TabsPage", icon: "log-out", logsOut: true },
		{ title: "关于", name: "AboutPage", icon: "information-circle" }
	];

	/** 退出登录后可浏览的页*/
	loggedOutPages: PageInterface[] = [
		{ title: "登录", name: "LoginPage", icon: "log-in" },
		{ title: "个人信息", name: "SupportPage", icon: "help" },
		{ title: "注册", name: "SignupPage", icon: "person-add" },
		{ title: "关于", name: "AboutPage", icon: "information-circle" }
	];

	/**当前活动页*/
	rootPage: any;

	constructor(
		public events: Events,
		public userData: UserData,
		public menu: MenuController,
		public platform: Platform,
		public confData: ConferenceData,
		public storage: Storage,
		public splashScreen: SplashScreen
	) {
		// 是否已经看过tutorial，如果已看过，就跳过它
		this.storage.get("hasSeenTutorial").then(hasSeenTutorial => {
			if (hasSeenTutorial) {
				this.rootPage = "TabsPage";
			} else {
				this.rootPage = "TutorialPage";
			}

			//平台准备就绪后，初始化插件（隐藏启动屏幕）
			this.platform.ready().then(() => {
				this.splashScreen.hide();
			});
		});

		// 加载会议数据（assets/data/data.json）
		confData.load();

		// 根据storage中保存的当前登录状态，决定应该隐藏menu中哪些items
		this.userData.hasLoggedIn().then(hasLoggedIn => {
			this.enableMenu(hasLoggedIn === true);
		});
		this.listenToLoginEvents();
	}

	/**
	 * 打开指定的页
	 * @param page 指定的页接口
	 */
	openPage(page: PageInterface) {
		if (page.logsOut === true) {
			// 退出前给予关闭menu的时间
			this.userData.logout();
		}
	}

	/**
	 * 打开4个页面的启动广告
	 */
	openTutorial() {
		this.nav.setRoot("TutorialPage");
	}

	/**
	 * 监听login、signup、logout事件
	 */
	listenToLoginEvents() {
		this.events.subscribe("user:login", () => {
			this.enableMenu(true);
		});

		this.events.subscribe("user:signup", () => {
			this.enableMenu(true);
		});

		this.events.subscribe("user:logout", () => {
			this.enableMenu(false);
		});
	}

	/**
	 * 是否可通过menu登录
	 * @param loggedIn 传递的参数（true：menu可用，false：menu不可用）
	 */
	enableMenu(loggedIn: boolean) {
		this.menu.enable(loggedIn, "loggedInMenu");
		this.menu.enable(!loggedIn, "loggedOutMenu");
	}

	/**
	 * 判断指定的子页面是否为活动页面，如果为true，将其设为主页。
	 * @param page 指定的子页面接口
	 */
	isActive(page: PageInterface) {
		let childNav = this.nav.getActiveChildNavs()[0];
		if (childNav) {
			return;
		}
		if (this.nav.getActive() && this.nav.getActive().name === page.name) {
			return "primary";
		}
		return;
	}
}
