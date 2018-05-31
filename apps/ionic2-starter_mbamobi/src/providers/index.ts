import { ERROR_HANDLER } from './error.handler';
import { User } from './user';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

export const Providers: any[] = [
    ERROR_HANDLER,
    User,
];

export const ProvidersNative = [
  Diagnostic,
  Network,
  SplashScreen,
  StatusBar
];

export { User };
