//import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

import { SoldeService } from './../services/solde.service';

import { FirebaseService } from './../services/firebase.service';
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
/*import { AuthService } from './services/auth.service';
import { LoadService } from './services/load.service';
import { FirebaseService } from './services/firebase.service';*/
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";
import { FcmService } from '../service/fcm.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
  @Input() firstName: string;
  itemsCollection1: AngularFirestoreCollection<any[]>;
  items1: Observable<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
items: Observable<any>;
conducteur={
  nom:"",
  prenom:"",
  tel:1,
  photo:"",

};
km=250;
  demande:any;
  client={
    nom:"",
    prenom:"",
    tel:1,
    tok:""
  
  }
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
profil:any;
  constructor(public notifie:SoldeService,private route: ActivatedRoute,public platform: Platform,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public servfire:FirebaseService,
    private fcmi: FcmService,private callNumber: CallNumber,
    public modalController: ModalController
    )
     { 
      
     }

  ngOnInit() {
    console.log(this.firstName);
    this.pour.present();
    this.log();
	this.itemsCollection1 = this.afs.collection('Transport', ref => ref
  .where('idClient', '==', this.firstName)
  .limit(1)
  .orderBy('date','desc')
	);
		this.items1 = this.itemsCollection1.snapshotChanges().pipe(
		  map(actions => {
			return actions.map(a => {
			  const data = a.payload.doc.data();
			  const id = a.payload.doc.id;
			  return { id, ...data };
			});
		  })
		);
		this.items1.subscribe((dat)=>{
			if(dat && !dat[0].statut){
        this.demande=dat[0];
        this.km=this.gps.calculateDistance(this.demande.departlat,this.demande.arrivelat,this.demande.departlong,this.demande.arrivelong);
     
        this.pour.dismiss();
        this.afs.collection('User').doc(this.demande.idClient).valueChanges().subscribe((da:any) => {
          this.client.nom=da.nom;
          this.client.prenom=da.prenom;
          this.client.tel=da.tel;
          this.client.tok=da.tok;
          console.log(da);
          this.pour.dismiss();
                });
                if(this.demande.idConducteur !=""){
                  this.afs.collection('User').doc(this.demande.idConducteur).valueChanges().subscribe((da:any) => {
                    this.conducteur.nom=da.nom;
                    this.conducteur.prenom=da.prenom;
                    this.conducteur.tel=da.tel;
                    if(da.photoEngin){
                      this.conducteur.photo=da.photoEngin;
                    }
                    console.log(da);
                    this.pour.dismiss();
                          });}
			}
			else{
				this.presentToast('Voyage indisponible');
				this.pour.dismiss();
			}
		})
  }
  log() {
    this.fireauth.authState.subscribe((user) => {
      // this.name =  this.route.snapshot.paramMap.get('id')
    //  this.pour.dismiss();
      // console.log(params);
    //  console.log(this.name);
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
            this.profil = da[0];
         //   this.stt = this.profil.status;
            //  this.notifie.viewnotification(this.profil.id);
            //this.pour.dismiss();
            console.log(this.profil);
            // this.information(this.name);
            //	  this.transport(this.profil);    }
          } else {
            //alert("vous n'etes pas connecter");
            this.presentToast("vous n'etes pas connecter");
            this.pour.dismiss();
          }

        });

      }
      else {
        this.pour.dismiss();
      }
    })
  }
  async presentToast(message) {
		const toast = await this.toastController.create({
		  message: message,
		  duration: 3000
		});
		toast.present();
    }
    save()
    {
    
     
this.callNumber.callNumber(this.conducteur.tel.toString(), true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
     
    
    }
    savel(){
      this.modalController.dismiss();
    }
}