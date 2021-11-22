//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
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
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 4000,
    autoplay: true,
    slidesPerView: 1,
    loop: true,


  };
  engin:any;
  //=["Grillade","Traditionnel","Tubercule","Farine","Poisson","Viande","Mixte","Pizza","Europeen","Africaine","Tournedos","Hotel","Legumes","Apperatif"];
commentaire="";
comments:any[];
identifie={
  lat:0,
  long:0
}
lcom=0;
derange:"";
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
  restaurant:any;
  restauranti:any;
  name:any;
    affichage=false;
    restoration={
      nom:"",
      tel:"",
      pays:"",
      categorie:"",
      departement:"",
      ville:"",
      quartier:"",
      logo:"",
      photo:[],
      idBoutique:"",
      lat:0,
      long:0,
      visible:true,
      status:true,
      date:firebase.firestore.FieldValue.serverTimestamp()
    };
  constructor(  private router: Router,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private storage:AngularFireStorage,
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public gps:AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth,
    private imagePicker: ImagePicker,
      private toastController: ToastController,
       public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService,
    public notifie:SoldeService,) {
      this.initialise();
      this.gps.gps().then((resp) => {
        this.identifie.lat=resp.coords.latitude;
        this.identifie.long=resp.coords.longitude;})
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


  ngOnInit() {

    this.name =  this.route.snapshot.paramMap.get('id');
    let cat =  this.route.snapshot.paramMap.get('categorie');
    console.log(this.name);
    console.log(cat);
    if( this.name !=null &&  this.name!=""){
     this.affichage=true;
     console.log(this.name);
     this.itemDoc =this.afs.collection('Boutique').doc(this.name);
     this.itemDoc.valueChanges().subscribe((data ) => {
       console.log(data);
       this.restoration.nom=data.nom;
       this.restoration.tel=data.tel;
       this.restoration.pays=data.pays;
       this.restoration.categorie=data.categorie;
       this.restoration.departement=data.departement;
       this.restoration.ville=data.ville;
       this.restoration.quartier=data.quartier;
       this.restoration.logo=data.logo;
       this.restoration.photo=data.photo;
       this.restoration.idBoutique=data.idBoutique;
       this.restoration.lat=data.lat;
       this.restoration.long=data.nom;
         this.restoration.date=firebase.firestore.FieldValue.serverTimestamp();
         console.log(this.restoration);
         console.log(this.restoration.nom);
         this.voi();

     }) ;


    }
    else{
     if(cat !=null && cat!=""){
       this.regarde(cat);
     }else{
       this.regarde();
     }

    }



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
             this.derange=this.profil.id;
             console.log(this.profil.id);

             //this.notifie.viewnotification(this.profil.id);

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
   voi() {
   this.ideaCollection1=this.afs.collection('CommentaireBoutique', ref => ref.where('restaurant', '==', this.name))
   this.ideaCollection1.snapshotChanges().pipe(
   map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   })
 ).subscribe(da => {
 console.log(da);
 this.lcom=da.length;
   this.comments=da;
 })
   }
   regarde(cat="")
   {
     console.log(cat);
 if(cat!=""){
   this.ideaCollection = this.afs.collection('Boutique', ref => ref.where('categorie', '==', cat).where('visible', '==', true));
 }
 else{
   this.ideaCollection = this.afs.collection('Boutique', ref => ref.where('visible', '==', true));
 }


 this.ideaCollection.snapshotChanges().pipe(
   map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return { id, ...data };
     });
   })
 ).subscribe(da => {
 console.log(da);
   this.restaurant=da;
   this.restauranti=  this.restaurant;
 })



 }






   redic(col)
   {
     // alert(col);
     this.router.navigate(['/shop-edit', { id: col }]);
   }
   commande()
   {
     // alert(col);
     this.router.navigate(['/shop-product', { id: this.name }]);
   }
   deleteR(){

     let objet=" Suppresion du Boutique "+this.restoration.nom;
     let de=new Date().toUTCString();
     let message="Le Boutique "+this.restoration.nom+". a bien été supprimer le "+de+ ". Pour en savoir plus, veuillez contacter l'Administrateur";
     this.notifie.creatednotification(this.profil.id,message,objet);

    // alert("Votre Boutique a été Supprimer");
     this.presentToast("Votre Boutique a été Supprimer");
     this.afs.collection('Boutique').doc(this.name).update({"visible":false});
     this.router.navigate(['/shop-edit']);
   }
   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
   plat()
   {
     // alert(col);
     this.router.navigate(['/shoping-cart', { resto: this.name }]);
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
       this.restoration.logo=Pic;
       const filePath = `Profile_photos/${this.profil.nom}.jpeg`;
       //alert(filePath);
       const ref = this.storage.ref(filePath);
       const task = ref.putString(Pic, 'data_url');
       // get notified when the download URL is available
       task.snapshotChanges().pipe(
         finalize(() => {
         ref.getDownloadURL().subscribe(url => {
         //this.imgPic = (url); // <-- do what ever you want with the url..
       //	this.updateProfilePhoto(url);
         this.restoration.logo=url;
         });
         })
       ).subscribe();

        }, (err) => {
       // Handle error this.imgPic = ref.getDownloadURL()
       console.log(err);
        });
   }

   photoprofil(){
     let options = {
       // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
       // selection of a single image, the plugin will return it.
       //maximumImagesCount: 3,

       // max width and height to allow the images to be.  Will keep aspect
       // ratio no matter what.  So if both are 800, the returned image
       // will be at most 800 pixels wide and 800 pixels tall.  If the width is
       // 800 and height 0 the image will be 800 pixels wide if the source
       // is at least that wide.
       width: 200,
       //height: 200,

       // quality of resized image, defaults to 100
       quality: 65,

       // output type, defaults to FILE_URIs.
       // available options are
       // window.imagePicker.OutputType.FILE_URI (0) or
       // window.imagePicker.OutputType.BASE64_STRING (1)
       outputType: 1
     };
    // this.imageResponse = [];



     this.imagePicker.getPictures(options).then((results) => {
       for (var i = 0; i < results.length; i++) {
         this.restoration.photo.push('data:image/jpeg;base64,' + results[i]);
       }
     }, (err) => {
     //  alert(err);
       this.presentToast(err);
     });



   }
   save(){
 if(this.restoration.nom !=""){
     this.restoration.photo.forEach(element => {

       const filePath = `Profile_photos/${this.restoration.nom}.jpeg`;
       //alert(filePath);
       const ref = this.storage.ref(filePath);
       const task = ref.putString(element, 'data_url');
       // get notified when the download URL is available
       task.snapshotChanges().pipe(
         finalize(() => {
         ref.getDownloadURL().subscribe(url => {
         //this.imgPic = (url); // <-- do what ever you want with the url..
       //	this.updateProfilePhoto(url);
        element=url;
         });
         })
       ).subscribe();

     });
     console.log(this.restoration);
    this.afs.collection('Boutique').doc(this.name).update(this.restoration);
 let drt=new Date().toUTCString;
    let message=" Vous avez Modifier une Boutique appélé "+this.restoration.nom+ " le " + drt;
    let Objet="Modification de Boutique";

    this.notifie.creatednotification(this.profil.id,message,Objet);
    this.router.navigate(['/shop']);
   }
   else{
     //alert(" Veuillez Renseigner les champs avant validation")
     this.presentToast(" Veuillez Renseigner les champs avant validation");
   }
 }
 send(){

   if(this.commentaire!=""){
     if(this.profil && this.profil !=null){
       this.afs.collection("CommentaireBoutique").add({
         nom:this.profil.nom,
         photo:this.profil.photo,
         content:this.commentaire,
         date:firebase.firestore.FieldValue.serverTimestamp(),
         idClient:this.profil.id,
         restaurant:this.name
       })
     }
     else{
       this.afs.collection("CommentaireBoutique").add({
         nom:"",
         photo:"",
         content:this.commentaire,
         date:firebase.firestore.FieldValue.serverTimestamp(),
         idClient:"",
         restaurant:this.name
       })
       this.commentaire="";
     }
   }
   else{
 //    alert( "Veuillez Ajouter le commentaire");
     this.presentToast("Veuillez Ajouter le commentaire");
   }
 }
 async presentPopover() {
  const popover = await this.popoverController.create({
    component: MenuRestoComponent,
    cssClass: 'custom-popover',
    translucent: true
  });
  return  popover.present();
}




filterList(evt) {
  // this.foodList = await this.initializeItems();
   const searchTerm = evt.target.value;
   this.restauranti=  this.restaurant;
 console.log(searchTerm);
 console.log(searchTerm.length);
   if (!searchTerm ||  0>= searchTerm.length ) {
     console.log(searchTerm.length);
     this.restauranti=  this.restaurant;
   }else{

   this.restauranti = this.restauranti.filter(currentFood => {
     if (currentFood.nom && searchTerm) {
       console.log(currentFood)
       return (currentFood.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||currentFood.categorie.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||currentFood.ville.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
     }
   });}
 }
}
