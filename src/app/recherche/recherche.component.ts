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

import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";
import { FcmService } from '../service/fcm.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  @Input() firstName: string;
  itemsCollection1: AngularFirestoreCollection<any[]>;
  items1: Observable<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
items: Observable<any>;
  demande:any;
  phot='';
  client={
    nom:"",
    prenom:"",
    tel:1,
    tok:""
  
  }
  conducteur={
    nom:"",
    prenom:"",
    tel:1,
    photo:"",
  
  };
  km=250;
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
profil:any;
  constructor(public notifie:SoldeService,private route: ActivatedRoute,public platform: Platform,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public servfire:FirebaseService,
    private fcmi: FcmService,
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
        this.phot=  this.demande.photo;
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
    
      let objet="Validation de la Course";
      let message="La demande de course émit par "+ this.client.nom+" de numéro de téléphone "+this.client.tel+" allant de "+this.demande.depart+" à "+ this.demande.arrive+" d'un prix de "+this.demande.prix+" Fcfa, a été validé par "+this.profil.nom+" de numéro de téléphone "+this.profil.tel; 
      this.itemDoc =this.afs.collection('Transport').doc(this.demande.id);
      this.itemDoc.update({visible:false,
        idConducteur:this.profil.id
      });
      this.notifie.creatednotification(this.profil.id,objet,message);
      this.notifie.creatednotification(this.demande.idClient,objet,message);
      //this.fcmi.sendnotification('Validation',message,this.demande.id,this.client.tok);
      this.router.navigate(["/voyage"]);
     
    
    }
    savel(){
      this.modalController.dismiss();
    }
}
