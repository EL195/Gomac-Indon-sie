//import { Component, OnInit } from '@angular/core';

//import { LoadService } from './../service/load.service';
//import { FirebaseService } from '/../../firebase.service';

import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Platform, AlertController, ModalController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Router } from '@angular/router';
import { ContactsService } from "src/app/services/contacts.service";
import * as firebase from 'firebase';
import { RechercheComponent } from 'src/app/recherche/recherche.component';
import { ValidationComponent } from 'src/app/validation/validation.component';
import { SoldeService } from '../services/solde.service';
import { FirebaseService } from '../services/firebase.service';
import { LoadService } from '../services/load.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    transporteur:any[];
    plati:any[];
    itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  transCollection: AngularFirestoreCollection<any[]>;
  trans: Observable<any>;
  uploadPercent: Observable<number>;
  constructor(public notifie:SoldeService,public contactsService: ContactsService,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,private database: AngularFirestore,
    public servfire:FirebaseService,    public modalController: ModalController,) { }

  ngOnInit() {
    this.itemsCollection = this.afs.collection('User', ref => ref.where('visible', '==',false))
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
     this.transporteur=da;
     this.plati=da;
      })
  }
redic(e){
    console.log(e);
    this.afs.collection('User').doc(e).update({visible:true});
}
filterList(evt) {
    // this.foodList = await this.initializeItems();
     const searchTerm = evt.target.value;
     this.plati=this.transporteur;
   console.log(searchTerm);
   console.log(searchTerm.length);
     if (!searchTerm ||  0>= searchTerm.length ) {
       console.log(searchTerm.length);
       this.plati=this.transporteur;
     }else{

     this.plati = this.plati.filter(currentFood => {
       if (currentFood.nom && searchTerm) {
         console.log(currentFood)
         return (currentFood.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||currentFood.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
       }
     });}
   }
}
