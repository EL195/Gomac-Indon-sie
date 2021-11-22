import { Component } from "@angular/core";

import { Platform, PopoverController,AlertController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from '@ionic-native/fcm/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { FcmService } from './service/fcm.service';
import { ValidationComponent } from './validation/validation.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotifComponent } from './components/notif/notif.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { OneSignal,OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  pro: string="";
  dd: string="";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireauth: AngularFireAuth,
    private fcmi: FcmService,
    private alertCtrl: AlertController,
    private fcm: FCM,
    public toastController: ToastController,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private nativeAudio: NativeAudio,
    private oneSignal: OneSignal,
    private media: Media,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();

        this.vefi();

    });
  }
public vefi(){

    this.fireauth.authState.subscribe((user) => {
        //  this.name = this.route.snapshot.paramMap.get('id');


          if (user) {

            this.oneSignal.startInit('42853c11-68e3-47b9-a020-9d55258f7a92', '522914356259');
            // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.setEmail(user.email);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
            this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
            this.oneSignal.endInit();
          }

        else{

            this.oneSignal.startInit('42853c11-68e3-47b9-a020-9d55258f7a92', '522914356259');
            // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
            this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
            this.oneSignal.endInit();
        }
        })
}

 private onPushReceived(payload: OSNotificationPayload) {
    this.platfo();
    alert( payload.body);
    console.log(JSON.stringify(payload));
   // alert(JSON.stringify(payload));
  //  alert(JSON.stringify(payload.additionalData));
  //  alert(JSON.stringify(payload.additionalData.don));
  //  alert( payload.additionalData.don);
   // this.PlaySong();
   // this.callNotif();

    if(payload.additionalData.don){
     let dd=payload.additionalData.don;
     if(payload.additionalData.type=="Transport"){
        this.router.navigate(['/colis', { id: dd }]);
     }
     else{
        this.router.navigate(['/restaurant-list', { id: dd }]);
     }

    }

 }

 private onPushOpened(payload: OSNotificationPayload) {
    this.platfo();
   alert( payload.body);
   console.log(JSON.stringify(payload));

  if(payload.additionalData.don){
    let dd=payload.additionalData.don;
    if(payload.additionalData.type=="Transport"){
       this.router.navigate(['/colis', { id: dd }]);
    }
    else{
       this.router.navigate(['/restaurant-list', { id: dd }]);
    }

   }
//alert(this.dd);
 }
 platfo() {
    const file: MediaObject = this.media.create("assets/pretty.mp3");


file.onSuccess.subscribe(() => {
this.presentToast("test1");
console.log('Action is successful');
//file.play();
//alert( "chargement");
//file.stop();

});

file.onError.subscribe(error => console.log('Error!', error));

// play the file
file.play();


}

PlaySong(){


this.nativeAudio.preloadSimple('Ide', "assets/pretty.mp3").then(suc=>{
console.log("succes");
//alert( "charge");
this.presentToast("musique");
this.nativeAudio.play('Ide', () => {console.log('uniqueId1 is done playing');
//alert( "play");

this.nativeAudio.unload('Ide')
});
}).catch(er=>{
    console.log("error");
    this.presentToast("erreur de chargement musique");
});


}
async callNotif() {
//  let event : any ;
  const popover = await this.popoverController.create({
    component: NotifComponent,
    cssClass: 'custom-class',
  //  event : ev,
    translucent: true
  });
  return  popover.present();
}
async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
