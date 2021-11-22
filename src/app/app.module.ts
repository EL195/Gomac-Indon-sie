import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore/public_api';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
declare var google;
import { GoogleMaps } from '@ionic-native/google-maps';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
///import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
//import { QRCodeModule } from 'angularx-qrcode';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import 'firebase/auth';
import 'firebase/firestore';
import { Media, MediaObject } from '@ionic-native/media/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    //QRCodeModule,
   // QRScanner,
    //BarcodeScanner,
    GoogleMaps,
   ImagePicker,
   NativeAudio,

    Camera,
    Geolocation,
    FCM,
    LocalNotifications,
    EmailComposer,
    NativeGeocoder,
    AngularFirestore,
    HTTP,
    Media,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
