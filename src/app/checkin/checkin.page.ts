import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
import { FirebaseService } from './../services/firebase.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { map, finalize, first } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { MenuVoyageComponent } from '../components/menu-voyage/menu-voyage.component';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  voyage: string;
  user: any = {};
  info : any = [];
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  commentCollection: AngularFirestoreCollection<any>;
  comment: Observable<any[]>;
  profileRef: AngularFirestoreDocument<any>;
  debiter : AngularFirestoreDocument<any>;
  principal: any = [];
  commentData: any = [];
  category: any;
  correctCategory: any;
  idDesc: string;
  userName: string;
  place  : any;
  pin  : any;

  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  idUser: any;
  boutique: boolean = false;
  credit: any;
  nom: string;
  image: string;
  pine: any;
  price: any;
  reste: any;
  besoin: boolean;
  RES: string;
  placee: string;
  voyageId: any;
  placeUser: any;
  categoryCollections: AngularFirestoreCollection<any>;
  categorys: Observable<any[]>;
  principal1: any = [];
  infos: any = [];
  checked: any;
  
  constructor(
    public popoverController: PopoverController,
    public router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private fireauth: AngularFireAuth,
    private alertController: AlertController,
    private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    private db: AngularFirestore,
    public toastController: ToastController,
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      this.voyage = paramMap.get('item');
     // console.log(this.category);
      this.setContent(this.voyage);


    });
  }

  setContent(voyage) {
    this.categoryCollection = this.afs.collection<any>('serviceReservation', ref => ref
      .where('idreservation', '==', voyage));
    this.category = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        this.idDesc = id;
        console.log(data)
        return { id, ...data };

      }))
    ); this.category.subscribe(data => {

      this.principal = data;
      console.log(this.principal)
     // console.log(this.principal[0].idDetailArticle)
      this.info = this.principal[0];
      this.checked=this.info.visible;
      console.log(this.info.sortie)
      //console.log(this.info.description)
      this.price = this.info.prix;
     // this.showComent(

     } );


  }

  validate(item){
console.log(item)
const idDesc = item;
const refe = "serviceReservation";
this.profileRef = this.db.doc(`${refe}/${idDesc}`);
this.profileRef.update({
  visible: false
});
this.presentToast('Réservation validée');
  }


  cancel(item){
    console.log(item)
    const idDesc = item;
    const refe = "serviceReservation";
    this.profileRef = this.db.doc(`${refe}/${idDesc}`);
    this.profileRef.update({
      visible: true
    });
    this.presentToast('Réservation Annulée');
      }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
