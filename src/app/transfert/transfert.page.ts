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
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {

  credit={
    email:"",
    pin:"",
    somme:0,
  };
  gt=0;
  profil:any;
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
    this.fireauth.authState.subscribe((user) => {
      //  this.name = this.route.snapshot.paramMap.get('id');
        this.pour.dismiss();
    
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
              this.gt=this.profil.credit;
              console.log(this.profil.id);
              this.notifie.viewnotification(this.profil.id);
       
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
  save(){
    let vt =true;
    if(this.credit.pin==""||this.credit.email==""||this.credit.somme==0){
  alert( "Veuillez renseigner les champs avant validation");
    }
    else{
      if(this.profil.pin!=this.credit.pin){
        alert( "Veuillez renseigner un mauvais PIN");
      }else{
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
            this.notifie.transferezcredit(this.profil.id,da[0].id,this.credit.somme);
            vt=false;
            this.credit.pin="";
            this.credit.somme=0;
            this.credit.email="";
            alert("Votre Transfert a bien aboutie");
          }
        
        } else {
          alert("Aucun n'utilisateur trouvée ");
          //this.pour.dismiss();
        }
  
      });
    }
    }
  }
}
