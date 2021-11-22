
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { MenuRestoComponent } from '../components/menu-resto/menu-resto.component';
import { PopoverController } from '@ionic/angular';
import { SoldeService } from './../services/solde.service';
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
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  itemsCollection1: AngularFirestoreCollection<any[]>;
  itemsCollection2: AngularFirestoreCollection<any[]>;
  itemsCollection3: AngularFirestoreCollection<any[]>;
  itemsCollection4: AngularFirestoreCollection<any[]>;
  itemCollections: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  items1: Observable<any>;
  items2: Observable<any>;
  items3: Observable<any>;
  items4: Observable<any>;
  name:any;
  profil={
    photo:"",
    nom:"",
    tel:0,
    secteur:"",
  };
  chauffeur:any;
  boutique:any;
  restau={
    photo:"",
    nom:"",
    tel:0,
    secteur:"",
    type:""
  };
  food={
    photo:"",
    nom:"",
    prix:0,
    status:false,
    type:""
  };
  produit={
    description:"",
    nom:"",
    prix:0,
    promo:0,
    photo:"",
    type:""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public popoverController: PopoverController,
    private storage:AngularFireStorage, 
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public gps:AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth,
  //  private imagePicker: ImagePicker,
      private toastController: ToastController,
       public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService,
    public notifie:SoldeService,
  ) {
this.pour.present();
    this.name =  this.route.snapshot.paramMap.get('id');
    if(this.name){
      this.afs.collection('Commande').doc(this.name).valueChanges().subscribe((data:any)=>{
        this.food.nom=data.nom;
        this.food.photo=data.photo;
        this.food.prix=data.prix;
        this.food.type=data.type;
        console.log(data);


        
        this.afs.collection('User').doc(data.idClient).valueChanges().subscribe((el:any)=>{
          this.profil.nom=el.nom;
          this.profil.tel=el.tel;
          this.profil.secteur=el.quartier;
          this.profil.photo=el.photo;
       


        })
        this.pour.dismiss();
        //this.pour.dismiss();
        if(data.type=="Repas"){
          this.afs.collection('Repas').doc(data.produit).valueChanges().subscribe((dat:any)=>{
            this.produit.nom=dat.nom;
            this.produit.description=dat.description;
            this.produit.prix=dat.prix;
            this.produit.promo=dat.promo;
            this.produit.photo=dat.photo;
            this.produit.type=dat.style;


            this.afs.collection('Restaurant').doc(dat.restau).valueChanges().subscribe((da:any)=>{
              this.restau.nom=da.nom;
              this.restau.tel=da.tel;
              this.restau.secteur=da.quartier;
              this.restau.photo=da.photo;
              this.restau.type=da.categorie;


            })
          })






        }else{

          this.afs.collection('Articles').doc(data.produit).valueChanges().subscribe((dat:any)=>{
            this.produit.nom=dat.nom;
            this.produit.description=dat.description;
            this.produit.prix=dat.prix;
            this.produit.promo=dat.promo;
            this.produit.photo=dat.photo;
            this.produit.type=dat.style;


            this.afs.collection('Boutique').doc(dat.Boutique).valueChanges().subscribe((da:any)=>{
              this.restau.nom=da.nom;
              this.restau.tel=da.tel;
              this.restau.secteur=da.quartier;
              this.restau.photo=da.photo;
              this.restau.type=da.categorie;


            })
          })

        }
       
      })
    }
   }

  ngOnInit() {
    this.pour.dismiss();
  }

}
