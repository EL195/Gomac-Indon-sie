import { element } from 'protractor';
import { SoldeService } from './../services/solde.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';

import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";
import { FcmService } from '../service/fcm.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  ideaCollection: AngularFirestoreCollection<any>;
itemsCollection: AngularFirestoreCollection<any[]>;
items: Observable<any>;
transCollection: AngularFirestoreCollection<any[]>;
uploadPercent: Observable<number>;
itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
profil:any;
notifions:any[];
name:any;
vef=false;
element={
  objet:"",
  date:new Date(),
  message:""
}
  itemsCollection1: AngularFirestoreCollection<any>;
  items1: Observable<any[]>;

  constructor(public notifie:SoldeService,
    private fcmi: FcmService,
    private route: ActivatedRoute,public platform: Platform,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public servfire:FirebaseService)
     {
       console.log(this.vef);
       //this.fcmi.sendnotification("Recherche","Salut","bgvjs","bbjjhs");
      this.name =  this.route.snapshot.paramMap.get('id');
      console.log(this.name);
      if(this.name){
        this.vef=true;
        this.afs.collection('notification').doc(this.name).update({status:true});
        this.recup(this.name);
      }
      else{
        false;
      }
     }
  recup(name: any) {
    this.afs.collection('notification').doc(name).valueChanges().subscribe((data:any) =>{
      this.element.date=data.date;
      this.element.objet=data.objet;
      this.element.message=data.message;

    } )
  }

  ngOnInit() {

    this.fireauth.authState.subscribe((user) => {
    //  this.name = this.route.snapshot.paramMap.get('id');
      this.pour.dismiss();
      // console.log(params);
      console.log(this.name);
      if (user) {
        console.log(user);
        this.itemsCollection = this.afs.collection('User', ref => ref.where('email', '==', user.email));
        this.items = this.itemsCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
        this.items.subscribe(da => {
          if (da) {
            console.log(da);
            this.profil = da[0];
            console.log(this.profil.id);
         //   this.notifie.viewnotification(this.profil.id);
            //this.pour.dismiss();
        //    console.log(this.profil);
            this.information();
            //	  this.transport(this.profil);    }
          } else {
            alert("vous n'etes pas connecter");
            this.pour.dismiss();
          }

        });

      }
      else {
        this.pour.dismiss();
      }
    })
  }
  information(){
    this.itemsCollection1 = this.afs.collection('notification', ref => ref.where('client', '==', this.profil.id).orderBy('date','desc'));
    this.items1 = this.itemsCollection1.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.items1.subscribe(da => {
      if (da) {
      this.notifions=da;

        //	  this.transport(this.profil);    }
      }

    });
  }
  redic(col){
    this.router.navigate(['/notification', { id: col }]);
  }

}
