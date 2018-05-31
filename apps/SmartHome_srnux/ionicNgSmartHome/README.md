### Smart Home playground project
### Typescript, Angular, Ionic

This project is created with starter template for [Ionic](https://github.com/ionic-team/ionic2-app-base) projects.
[Ionic Framework](http://ionicframework.com/docs/)

Install Ionic Cordova globally 
```bash
$ npm install -g ionic cordova
```

Create new project from tabs template
```bash
$ ionic start myTabs tabs
```
### Hardware
Philips Hue Bridge - local IP 192.168.178.56  
Philips Hue Motion Sensor

### Build and run for platform with the Ionic CLI:
Open in browser
```bash
$ ionic serve
```

Android

[Configuration](https://cordova.apache.org/docs/en/latest/guide/platforms/android/)

Run in Android emulator
```bash
$ ionic cordova emulate android
```
Run on Android
```bash
$ ionic cordova platform add android
$ ionic cordova run android
``` 

iOS

[Configuration](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/) 
```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```