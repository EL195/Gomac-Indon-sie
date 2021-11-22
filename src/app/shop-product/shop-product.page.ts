
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
  selector: 'app-shop-product',
  templateUrl: './shop-product.page.html',
  styleUrls: ['./shop-product.page.scss'],
})
export class ShopProductPage implements OnInit {
  ideaCollection: AngularFirestoreCollection<any>;
  ideaCollection1: AngularFirestoreCollection<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
 // itemDoc: AngularFirestoreDocument<any>;
  items: Observable<any>;
  transCollection: AngularFirestoreCollection<any[]>;
  uploadPercent: Observable<number>;
  itemDoc: AngularFirestoreDocument<any>;
  itemDo: AngularFirestoreDocument<any>;
  ite: Observable<any>;
    item: Observable<any>;
  profil:any;
  edit=true;
  name:string;
  restau:string="";
  comman:any;
  plat:any;
  course:any;
  view=true;
  engin:any;
  //=["Grillade","Traditionnel","Tubercule","Farine","Poisson","Viande","Mixte","Pizza","Europeen","Africaine","Tournedos","Hotel","Legumes","Apperatif"];

  constructor( private route: ActivatedRoute,
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
    public notifie:SoldeService,) { this.initialise();}

  ngOnInit() {
    this.userud();
    this.name =  this.route.snapshot.paramMap.get('id');
    console.log(this.name);
    if(this.name!=null && this.name!=""){
      this.view=false;
      this.ideaCollection = this.afs.collection('Commande', ref => ref
     .where('restau', '==', this.name)
     .where('status', '==', true)
      .orderBy('date','desc'));
          this.item = this.ideaCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
          this.item.subscribe(da => {
            if (da) {
              console.log(da);
              this.plat = da;

          };
    })
  }
  }
  userud() {
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
              //his.derange=this.profil.id;
              console.log(this.profil.id);

          //    this.notifie.viewnotification(this.profil.id);

              this.pour.dismiss();
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
  redic(col)
  {
    // alert(col);
    this.router.navigate(['/shop-edit', { categorie: col }]);
  }
  redice(col)
  {
    // alert(col);
    this.router.navigate(['/restaurant-list', { id: col }]);
  }
  initialise() {


    this.afs.collection('Global', ref => ref.where('visible', '==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    ).subscribe(da => {
      console.log(da[0].data);
      this.engin=da[0].data["Boutique"];
      console.log(da[0].data["Boutique"]);
    })
  }
}
