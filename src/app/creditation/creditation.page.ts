import { SoldeService } from './../services/solde.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadService } from './../services/load.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";
import { FirebaseService } from './../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-creditation',
  templateUrl: './creditation.page.html',
  styleUrls: ['./creditation.page.scss'],
})
export class CreditationPage implements OnInit {
  credit={
    email:"",
    somme:0,
  }
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  constructor(

    private storage:AngularFireStorage, 
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public gps:AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth,
     private router: Router,
      private toastController: ToastController,
       public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService,
    public notifie:SoldeService,
  ) { }

  ngOnInit() {
  }
save(){
  let vt =true;
  if(this.credit.email==""||this.credit.somme==0){
alert( "Veuillez renseigner les champs avant validation");
  }
  else{
    this.itemsCollection = this.afs.collection('User', ref => ref.where('email', '==', this.credit.email));
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
      if (da.length>=1) {
        console.log(da[0]);
        if(vt){
          this.notifie.creditation(da[0].id,this.credit.somme);
          vt=false;
          this.credit.somme=0;
          this.credit.email="";
        }
       // this.profil = da[0];
       // console.log(this.profil.id);
      
        //this.pour.dismiss();
    //    console.log(this.profil);
      //  this.information();
        //	  this.transport(this.profil);    }
      } else {
        alert("Aucun n'utilisateur trouvée ");
        //this.pour.dismiss();
      }

    });
  }
}
}
