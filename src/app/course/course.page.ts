import { SoldeService } from './../services/solde.service';
import { FirebaseService } from './../services/firebase.service';
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
/*import { AuthService } from './services/auth.service';
import { LoadService } from './services/load.service';
import { FirebaseService } from './services/firebase.service';*/
import { Component, OnInit } from '@angular/core';
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

import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';
import { FcmService } from '../service/fcm.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
	engin=["Motor","Taksi","Bajaj","Bis","Pribadi","Truk","Tronton"];
	isionage:boolean=false;
	visionage:boolean=false;
	course={
	  type:"",
	  date:firebase.firestore.FieldValue.serverTimestamp(),
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
	dist1=0;
	dist2=0;
	dist3=0;
	dist4=0;
	depart;arrive:Marker;
	markers:Marker[];
	markes:Marker[];
	ideaCollection: AngularFirestoreCollection<any>;
	itemsCollection: AngularFirestoreCollection<any[]>;
	items: Observable<any>;
	itemsCollection1: AngularFirestoreCollection<any[]>;
	items1: Observable<any>;
	transCollection: AngularFirestoreCollection<any[]>;
	uploadPercent: Observable<number>;
	profil:any;
	downloadURL: Observable<any>;
	constructor(public notifie:SoldeService,public platform: Platform,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
	  private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
	  public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public servfire:FirebaseService,
	  public fcmi:FcmService
	  ) { }




  ngOnInit() {
   this.pour.present();
  this.fireauth.authState.subscribe((user)=> {
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
			  this.pour.dismiss();
			  console.log(this.profil);
		//	  this.transport(this.profil);
		this.notifie.viewnotification(this.profil.id);
		this.platform.ready().then(() => this.loadMap());
			}
			else{
				//alert("vous n'avez pas de compte");
				this.presentToast("Andatidak punya akun");
				this.pour.dismiss();
				this.router.navigate(["/login"]);
			}

		  })

	  }
	  else{
		//this.pour.dismiss();
		//alert("vous n'etes pas  connecter");
		this.presentToast("Anda tidak terhubung");
				this.pour.dismiss();
				this.router.navigate(["/login"]);
	  }
  })
}

	/* Only instantiate the map AFTER the view is initialized and the DOM is accessible */
	ngAfterViewInit() {
	//	this.platform.ready().then(() => this.loadMap());
	}
changeme(){

	if(this.course.engin=='Taksi'){
		this.km=200;
	}
	if(this.course.engin=='Motor'){
		this.km=75;
	}
	if(this.course.engin=='Bajaj'){
		this.km=400;
	}
	if(this.course.engin=='Pribadi'){
		this.km=200;
	}
	if(this.course.engin=='Bis'){
		this.km=1500;
	}
	if(this.course.engin=='Tronton'){
		this.km=2000;
	}
	if(this.course.engin=='Truk'){
		this.km=1000;
	}
	this.isionage=true;
}

	loadMap() {
		/* The create() function will take the ID of your map element */
		const map = GoogleMaps.create('map');

		map.one( GoogleMapsEvent.MAP_READY ).then((data: any) => {
			const coordinates: LatLng = new LatLng(this.profil.lat, this.profil.long);

			map.setCameraTarget(coordinates);
			map.setCameraZoom(18);
		});
		//let marker ;
	map.addMarker({
			position: {lat: this.profil.lat, lng: this.profil.long},
			icon: 'blue',
			'title': "Keberangkatan",
			map:map,
			draggable: true
		  }).then((mark:Marker) =>{
			this.depart=mark;
			console.log("marqueur 1");
			console.log(this.depart);

		/*	let circle = map.addCircle({
				center: this.depart.getPosition(),
				radius: 10,
				fillColor: "rgba(0, 0, 255, 0.5)",
				strokeColor: "rgba(0, 0, 255, 0.75)",
				strokeWidth: 1
			  });

			  // circle.center = marker.position
			  this.depart.bindTo("position", circle, "center");
			 // let marker1 ;*/

		  });

		  map.addMarker({
			position: {lat: this.profil.lat, lng: this.profil.long+0.0000802},
			icon: 'red',
			map:map,
			'title': "Tujuan",
			draggable: true
		  }).then((markr:Marker) =>{
			this.arrive=markr;
			this.visionage=true;
			console.log("marqueur 2");
			console.log(this.arrive);


		  });


	}
	photosave(){
		   const options: CameraOptions = {
		quality: 75,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
	  }

	  this.camera.getPicture(options).then((imageData) => {
		//console.log(imageData);
		let Pic = 'data:image/jpeg;base64,' + imageData;
		const filePath = `Colis_photos/${this.course.type}.jpeg`;
		//alert(filePath);
		const ref = this.storage.ref(filePath);
		const task = ref.putString(Pic, 'data_url');
		// get notified when the download URL is available
		task.snapshotChanges().pipe(
		  finalize(() => {
		  ref.getDownloadURL().subscribe(url => {
			//this.imgPic = (url); // <-- do what ever you want with the url..
		//	this.updateProfilePhoto(url);
			this.course.photo=url;
			});
		  })
		).subscribe();

	   }, (err) => {
		// Handle error this.imgPic = ref.getDownloadURL()
		console.log(err);
	   });
	  }
	  save(){
		this.pour.present();
		this.course.idClient=this.profil.id;
		console.log(this.depart);
		console.log(this.depart.getPosition());
		console.log(this.arrive);
		console.log(this.arrive.getPosition());
		  if(this.course.type===""||this.course.engin===""){
		//	alert("Veuillez remplir le formulaire");
			this.presentToast("Silahkan isi formulir");
		  }else{
					if(this.course.engin=='Taksi'){
						this.km=200;
					}
					if(this.course.engin=='Motor'){
						this.km=75;
					}
					if(this.course.engin=='Bajaj'){
						this.km=400;
					}
					if(this.course.engin=='Pribadi'){
						this.km=200;
					}
					if(this.course.engin=='Bis'){
						this.km=1500;
					}
					if(this.course.engin=='Tronton'){
						this.km=2000;
					}
					if(this.course.engin=='Truk'){
						this.km=1000;
					}

		//  alert("Veuillez patienter");
		  this.presentToast("Silahkan tunggu");
		if(this.course.type!="Colis"){

			this.course.photo=this.profil.photo;

		}else{
		  if(this.course.photo==""){
			//this.uploadFile(this.course.photo);
			this.course.photo=this.profil.photo;
		  }}
		  console.log(this.depart);
		  console.log(this.arrive);

		  this.gps.geographie(this.depart.getPosition().lng,this.depart.getPosition().lat).then((result: NativeGeocoderResult[]) =>{
			this.course.departlat=this.depart.getPosition().lat;
			this.course.departlong=this.depart.getPosition().lng;
			this.course.arrivelat=this.arrive.getPosition().lat;
			this.course.arrivelong=this.arrive.getPosition().lng;
			if(result[0]){

				if(result[0].locality){
					this.course.villedepart=result[0].locality;
				  }
				  if(result[0].subLocality){
					this.course.villedepart+=";"+result[0].subLocality;
				  }

				  if(result[0].thoroughfare){
					this.course.depart=result[0].thoroughfare;
				  }
				  if(result[0].subThoroughfare){
					this.course.depart=";"+result[0].subThoroughfare;
				  }
				}
				this.gps.geographie(this.arrive.getPosition().lng,this.arrive.getPosition().lat).then((resulta: NativeGeocoderResult[]) =>{
					console.log(resulta);
					if(resulta[0]){

						if(resulta[0].thoroughfare){
							this.course.arrive=resulta[0].thoroughfare;
						  }
						  if(resulta[0].subThoroughfare){
							this.course.arrive=";"+resulta[0].subThoroughfare;
						  }

						if(resulta[0].locality){
							this.course.villearrive=resulta[0].locality;
						  }
						  if(resulta[0].subLocality){
							this.course.villearrive+=";"+resulta[0].subLocality;
						  }

						  console.log(this.course);
						  console.log(this.course);
						  let lat1=this.arrive.getPosition().lat;
						  let lat2=this.depart.getPosition().lat;
						  let lat3=this.arrive.getPosition().lng;
						  let lat4=this.depart.getPosition().lng;
						  let distance=this.gps.calculateDistance(lat1,lat2,lat3,lat4);
						  this.course.prix=Math.floor(distance*this.km);
                          if(this.course.engin=='Motor' && 200>this.course.prix){
                            this.course.prix=200;
                          }
                          if((this.course.engin=='Taksi'||this.course.engin=='Pribadi') && 500>this.course.prix){
                            this.course.prix=500;
                          }
						  this.afs.collection('Transport').add(this.course);
						  let objet= "Anda baru pesan kendaraan";
    let message=" Anda baru pesan kendaraan jenis "+ this.course.type+" Dari "+this.course.villedepart +"ke"+this.course.villearrive;
    this.notifie.creatednotification(this.profil.id,message,objet);
						 // alert("Votre Voyage a bien été enregistrer");
						  this.presentToast("Pesanan anda lagi diproses");
						 // this.router.navigate(["/home"]);
						 this.recherchons();
						}

				})

		  }).catch(er=>{
			  this.presentToast("GPS anda tidak aktiv");
		  });




	   //
		console.log(this.course);
		let lat1=this.arrive.getPosition().lat;
		let lat2=this.depart.getPosition().lat;
		let lat3=this.arrive.getPosition().lng;
		let lat4=this.depart.getPosition().lng;
		let distance=this.gps.calculateDistance(lat1,lat2,lat3,lat4);
		console.log(distance);
		//alert("Vous avez Selectionnez une distance de "+distance+" Km");
		this.presentToast("Jarak"+distance+" Km");
		//this.afs.collection('Transport').add(this.course);
	}
	  }
	recherchons() {
	//	throw new Error('Method not implemented.');


	this.itemsCollection1 = this.afs.collection('User', ref => ref
	.where('role', '==', 'Conducteur')
	.where('ville','==',this.profil.ville)
	.limit(15)
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
			if(dat){
				dat.forEach(element => {
						if(5>this.gps.calculateDistance(element.lat,this.arrive.getPosition().lat,element.long,this.arrive.getPosition().lng)){
					let mes="Pesanan dari "+this.profil.nom;
					//this.fcmi.sendnotification("Recherche",mes,this.profil.id,element.email)
					this.presentToast('Mencari sopir');
				}
					else{this.presentToast('tidak ada sopir tersedia');
					this.pour.dismiss();}
				});
				this.pour.dismiss();
			}
			else{
				this.presentToast('Tidak ada sopir tersedia');
				this.pour.dismiss();
			}
		})


	}
	  uploadFile(file){
		  /*
		const filePath = 'Image';
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		// get notified when the download URL is available
		task.snapshotChanges().pipe(
			finalize(() => this.downloadURL = fileRef.getDownloadURL() )
		 )
		.subscribe(data=>{
		  console.log(data);
		  this.profil.photo=data.downloadURL;
		})
	  */
	  }
	  async presentToast(message) {
		const toast = await this.toastController.create({
		  message: message,
		  duration: 3000
		});
		toast.present();
	  }
}
