import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, IonSlides } from "@ionic/angular";
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";
import { FirebaseService } from './../services/firebase.service';
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-voyage-add',
  templateUrl: './voyage-add.page.html',
  styleUrls: ['./voyage-add.page.scss'],
})
export class VoyageAddPage implements OnInit {
  VilleCollection: AngularFirestoreCollection<any>;
  ville: Observable<any[]>;
  principal: any = [];
  VilleCollections: AngularFirestoreCollection<any>;
  villes: Observable<any[]>;
  principals: any = [];
  itemsCollection: AngularFirestoreCollection<any[]>;
  itemsCollections: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  role: any;
  iduser: any;
  nimageVoyage: any;
  nomVoyage: any;
  idAgence: string;
  depart : any;
  arrivee : any;
  type : any;
  place  : Number;
  prix  : any;
  datedepart: any;
  idVoyage: string;

  constructor(public platform: Platform,
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
    private afs: AngularFirestore,private database: AngularFirestore,
    public servfire:FirebaseService
    ) {}

  ngOnInit() {
    this.getContent();
    console.log("hello");
    this.pour.present();
    this.fireauth.authState.subscribe((user)=> {
      console.log("hello");
      if(user){
        console.log("hello");
      console.log(user);
      this.itemsCollection = this.afs.collection('User', ref => ref.where('email', '==', user.email))
      ;
      this.items = this.itemsCollection.snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        })
      );
        this.items.subscribe(da=>{
        if(da){
          this.profil=da[0];
          this.pour.dismiss();
          console.log(this.profil);
          this.role = this.profil.status;
          this.iduser = this.profil.id;
          this.getAgence(this.iduser);
          console.log(this.iduser);
      //	  this.transport(this.profil);
     // this.platform.ready().then(() => this.loadMap());
        }
        else{
          console.log("hellojjjj");
         
          this.pour.dismiss();
        }
         
        })
  
      }
      else{
        console.log("hell");
        this.router.navigate(['/login']);
      this.pour.dismiss();
      }
    })
  }
  getContent(){
   // console.log(category);
    this.VilleCollection = this.afs.collection<any>('villes');
  this.ville = this.VilleCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.ville.subscribe(data => {

    this.principal = data;
    console.log(this.principal)
    

  });



  }

  getAgence(v){
     this.VilleCollections = this.afs.collection<any>('agences', ref => ref
      .where('user', '==', v));
   this.villes = this.VilleCollections.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as any;
       const id = a.payload.doc.id;
       console.log(data)
       return { id, ...data };
 
     }))
   );   this.villes.subscribe(data => {
 
     this.principals = data;
     console.log(this.principals[0])
     console.log(this.principals[0].nom)
     this.nomVoyage = this.principals[0].nom;
    // this.idAgence 
     this.nimageVoyage = this.principals[0].image;
     this.idAgence = this.principals[0].matriculeAgence;
     
 
   });
 
 
 
   }

   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

   save(){
     console.log(this.depart);
     if(this.depart==undefined){
      this.presentToast("La ville de départ ne peut être vide!");

     }
     else {
      if(this.arrivee==undefined){
        this.presentToast("La ville d'arrivée ne peut être vide!");
       }
       else{
        if(this.place==undefined){
          this.presentToast("Veuillez définir le nombre de places du voyage!");
          
         }
         else{
          if(this.prix==undefined){
            this.presentToast("Veuillez définir le prix du voyage!");
           }
           else{
            if(this.type==undefined){
              this.presentToast("Veuillez définir la date de départ du voyage!");
             }
           
            if(this.datedepart==undefined){
              this.presentToast("Veuillez définir le type de voyage!");
             }
             else{
              if(this.depart==this.arrivee){
                this.presentToast("La ville de départ doit etre différente de celle d' arrivée.");
               }
               else {
                this.idVoyage =  'VG' + Math.random().toString(36).substr(2, 9);
                let elt : any = {
                depart : this.depart,
                arrivee : this.arrivee,
                type : this.type,
                agence : this.nomVoyage,
                user : this.iduser,
                image : this.nimageVoyage,
                idVoyage :  this.idVoyage,
                place : this.place,
                prix : this.prix,
                restePlaces : 0,
                idAgence : this.idAgence,
                dateDepart : firebase.firestore.Timestamp.fromDate(new Date(this.datedepart)),
                dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
              }
              this.itemsCollection = this.database.collection('voyages');
              this.itemsCollection.add(elt);
             //places
             console.log("1")
             var num = 1
              while (num <= this.place) {
                console.log("elts")
                let elts : any = {
                  numero : num,
                  voyageId : this.idVoyage,
                  statut : false,
                  user : "",
                  dateDepart : firebase.firestore.Timestamp.fromDate(new Date(this.datedepart)),
               }
               console.log(elts)
                this.itemsCollections = this.database.collection('places');
                this.itemsCollections.add(elts);
                num++;
             }

             //end places
              this.openLoader();
              this.router.navigate(['/agence' ,this.idAgence]);
               }
             }
           }

         }
       }
     }
}   
  createPlaces(place, voyage) {
    let i : number;
    for(i =1 ;i>=place;i++) {
      let elts : any = {
        numero : i,
        voyageId : voyage,
        statut : false,
        user : "",
        dateDepart : firebase.firestore.Timestamp.fromDate(new Date(this.datedepart)),
     }
      this.itemsCollections = this.database.collection('places');
      this.itemsCollections.add(elts);
   }
  }
   

   async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Traitement en cours,  veuillez patienter ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

}
