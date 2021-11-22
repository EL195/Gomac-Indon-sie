//import { Component, OnInit } from '@angular/core';
import { SoldeService } from './../services/solde.service';
import { Component, OnInit } from '@angular/core';
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
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';

import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  engin=["Moto","Taxi","Motocyclette","Bus","Personel","Camions","Grumier"];
demande={
  type:"",
  date:new Date(),
  villedepart:"",
  villearrive:"",
  depart:"",
  photo:"",
  departlat:0,
  departlong:0,
  arrive:"",
  arrivelat:0,
  arrivelong:0,
  engin:"",
  idClient:"",
  idConducteur:"",
  idCommande:"",
  visible:true,
  status:false,
  prix:0
};
km=250;
depart;arrive:Marker;
markers:Marker[];
markes:Marker[];
ideaCollection: AngularFirestoreCollection<any>;
itemsCollection: AngularFirestoreCollection<any[]>;
items: Observable<any>;
transCollection: AngularFirestoreCollection<any[]>;
uploadPercent: Observable<number>;
itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
profil:any;
name:any;
//demande:any;
client={
  nom:"",
  prenom:"",
  tel:1,

}
conducteur={
  nom:"",
  prenom:"",
  tel:1,
  photo:"",

}
commande=false;
stt="";
  vision: any;
  constructor(public notifie:SoldeService,private route: ActivatedRoute,public platform: Platform,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public servfire:FirebaseService)
     { 
      
     }
  

  async ngOnInit() {
    await this.fireauth.authState.subscribe((user)=> {
      this.name =  this.route.snapshot.paramMap.get('id')
      this.pour.dismiss();
      // console.log(params);
       console.log( this.name);
      if(user){
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
          this.stt= this.profil.status;
          this.notifie.viewnotification(this.profil.id);
          //this.pour.dismiss();
          console.log(this.profil);
          this.information(this.name);
      //	  this.transport(this.profil);    }
         } else{
          alert("vous n'etes pas connecter");
          this.pour.dismiss();
        }
         
        })
    
      }
      else{
      this.pour.dismiss();
      }
    }
    
    )
  }
  information(name: any) {
    console.log(name);
    this.itemDoc =this.afs.collection('Transport').doc(name);
     this.itemDoc.valueChanges().subscribe((data ) => {
      console.log(data);
      this.demande.departlat=data.departlat;
      this.demande.departlong=data.departlong;
      this.demande.arrivelat=data.arrivelat;
      this.demande.arrivelong=data.arrivelong;
     this.loadMap();
    });
   // console.log(this.item);
  }
  loadMap() {
		/* The create() function will take the ID of your map element */
		const map = GoogleMaps.create('map');

		map.one( GoogleMapsEvent.MAP_READY ).then((data: any) => {
			const coordinates: LatLng = new LatLng(this.demande.departlat, this.demande.departlong);

			map.setCameraTarget(coordinates);
			map.setCameraZoom(18);
		});
		//let marker ;
	map.addMarker({
			position: {lat: this.demande.departlat, lng: this.demande.departlong},
			icon: 'blue',
			'title': "Depart",
			map:map,
			draggable: false
		  }).then((mark:Marker) =>{
			this.depart=mark; 
			console.log("marqueur 1");
			console.log(this.depart);

			 
		  });

		  map.addMarker({
			position: {lat: this.demande.arrivelat, lng: this.demande.arrivelong},
			icon: 'red',
      map:map,
      draggable: false,
			'title': "Destination",
		  }).then((markr:Marker) =>{
			this.arrive=markr; 
	
			console.log("marqueur 2");
			console.log(this.arrive);
		  });
	}
}
