import { AuthService } from 'src/app/services/auth.service';
import { RechercheComponent } from './../recherche/recherche.component';

import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ValidationComponent } from '../validation/validation.component';
//import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { map, finalize, first } from 'rxjs/operators'
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadService } from '../services/load.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  itemsCollection: AngularFirestoreCollection<any[]>;
 // itemDoc: AngularFirestoreDocument<any>;
  items: Observable<any>;
  usercon:any;
  profil={
    nom:"",
    prenom:"",
    tel:"",
    email:"",
    pays:"",
    departement:"",
    ville:"",
    quartier:"",
    password:"",
    pin:"",
    credit:0,
    status:"",
    modele:"",
    matricule:"",
    photo:"",
    photoEngin:"",
    tok:{},
    lat:0,
    long:0
  };
  gpt:any;
  constructor(public modalController: ModalController,
    public gps:AuthService,
    private firebase: FCM,
    private afs: AngularFirestore,
    public pour:LoadService,
    public toastController: ToastController,
    private fireauth: AngularFireAuth,
    private http:HTTP,
    private platform: Platform) { }


async getToken() {
  console.log('j');
  let token;

  if (this.platform.is('android')) {
    token = await this.firebase.getToken();
  }

  if (this.platform.is('ios')) {
    token = await this.firebase.getToken();
 //   await this.firebase.grantPermission();
  }
console.log(token);
token = await this.firebase.getToken();
console.log(token);
this.saveToken(token);
}

public saveToken(token) {
  if (!token) return;

  const devicesRef = this.afs.collection('devices');
token.then(tokeni => {
  console.log(tokeni);
  console.log("bonjour");
  let de=tokeni;
  const data = {
    tok:de,
    userId: 'testUserId'
  };
  devicesRef.add(data);

  this.fireauth.authState.subscribe((user) => {
    //  this.name = this.route.snapshot.paramMap.get('id');
     
  
      if (user) {
        console.log(user);
     let tr=user.email;
     let mini=tr.split('@');
     let voulu=mini[0];
        this.firebase.subscribeToTopic(tr);
        this.firebase.subscribeToTopic(voulu);
        //this.presentToast();
      }
      
    })
  //  return token;
});
 
  


}
private async presentToast(message) {
  const toast = await this.toastController.create({
    message,
    duration: 3000
  });
  toast.present();
}

onNotifications() {
  return this.firebase.onNotification();
}




}