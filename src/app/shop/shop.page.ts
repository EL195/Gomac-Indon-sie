import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
view:boolean=true;
slideOpts = {
  initialSlide: 1,
  speed: 12000,
  autoplay: true,
  slidesPerView: 2,
  loop: true,
  centeredSlides: true,
  spaceBetween: 2
};
profil:any;
Categorie:any;
boutiquesk:any;
produitk:any;
global:any;
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
  status:true,
  visible:true,
  date:firebase.firestore.FieldValue.serverTimestamp()
};

itemsCollection: AngularFirestoreCollection<any[]>;
items: Observable<any>;
itemsCollect: AngularFirestoreCollection<any[]>;
item: Observable<any>;
  commandek:any;
  constructor(
    private router: Router,
    public popoverController: PopoverController,
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
    public notifie:SoldeService,
  ) {
    this.pour.present();

   }
  initialise() {
    this.afs.collection('Boutique', ref => ref.where('visible', '==', true).orderBy('date','desc').limit(8)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    ).subscribe(boutik => {
      console.log(boutik);
      this.boutiquesk=boutik;
      this.pour.dismiss();
    })

    this.afs.collection('Articles', ref => ref.where('visible', '==', true).orderBy('date','desc').limit(8)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    ).subscribe(artik => {
      console.log(artik);
      this.produitk=artik;
     // console.log(this.produit);
    })


    this.afs.collection('Commande', ref => ref.where('type', '==', 'Articles').orderBy('date','desc').limit(8)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    ).subscribe(commack => {
      console.log(commack);
      this.commandek=commack;
      this.pour.dismiss();
    })

    this.afs.collection('Global', ref => ref.where('visible', '==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    ).subscribe(globak => {
      console.log(globak[0].data);
      this.Categorie=globak[0].data["Boutique"];
      console.log(globak[0].data["Boutique"]);
    })
  }

  ngOnInit() {
    this.charge();
  }
  charge() {
    this.fireauth.authState.subscribe((user) => {
      //  this.name = this.route.snapshot.paramMap.get('id');


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
              console.log(this.profil.id);
              //this.restoration.idRestaurant=this.profil.id;
             // this.notifie.viewnotification(this.profil.id);
              if(this.profil.status=="Boutique"){
                console.log("editer1")
                this.resto();

              }
              else{
                this.initialise();
              }
              this.pour.dismiss();
            }
          });

        }

      })
  }
  resto() {
    this.pour.dismiss();
    this.itemsCollect = this.afs.collection('Boutique', ref => ref.where('idBoutique', '==', this.profil.id).where('visible', '==', true).orderBy('date','desc').limit(8));
    this.item = this.itemsCollect.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
this.item.subscribe((data)=>{
  console.log(data);
if(data.length>=1){
  console.log("editer")
  this.router.navigate(['/shop-edit', { id: data[0].id }]);
}else{
  this.view=false;
  this.restoration.idBoutique=this.profil.id;
this.gps.gps().then((resp) => {
  this.restoration.lat=resp.coords.latitude;
  this.restoration.long=resp.coords.longitude; this.restoration.lat=resp.coords.latitude;
  this.restoration.long=resp.coords.longitude;
  if(!this.restoration.lat ||this.restoration.lat==null){
    this.restoration.lat=this.profil.lat;
    this.restoration.long=this.profil.long;
  }
console.log(resp);
  this.gps.geographie(this.restoration.lat,this.restoration.long).then((result: NativeGeocoderResult[]) =>{
    if(result){
     let paysage=result[0];

    // this.profil.departement="";
  //   alert(paysage.countryCode);
    // this.profil.quartier="";
     if(paysage.countryCode){
       this.restoration.pays=paysage.countryCode;
     }
     if(paysage.countryName){
       this.restoration.pays+=";"+paysage.countryName;
     }
     if(paysage.administrativeArea){
       this.restoration.departement=paysage.administrativeArea;
     }
     if(paysage.subAdministrativeArea){
       this.restoration.departement+=";"+paysage.subAdministrativeArea;
     }
     if(paysage.locality){
       this.restoration.ville=paysage.locality;
     }
     if(paysage.subLocality){
       this.restoration.ville+=";"+paysage.subLocality;
     }
     if(paysage.thoroughfare ){
       this.restoration.quartier=paysage.thoroughfare;
     }
     if(paysage.subThoroughfare){
       this.restoration.quartier=";"+paysage.subThoroughfare;
     }

    }
       this.pour.dismiss();
  })
  //.catch(er =>{console.log(er)});
})
}
});

  }



  async presentPopover() {
    const popover = await this.popoverController.create({
      component: MenuRestoComponent,
      cssClass: 'custom-popover',
      translucent: true
    });
    return  popover.present();
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
      alert(err);
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
          //  this.imgPic = (url); // <-- do what ever you want with the url..
         //	this.updateProfilePhoto(url);
           element=url;
            });
            })
          ).subscribe();

        });
        console.log(this.restoration);
       this.afs.collection('Boutique').add(this.restoration);
    let drt=new Date().toUTCString;
       let message=" Vous avez créé une Boutique appelé "+this.restoration.nom+ " le " + drt;
       let Objet="Création de Boutique";

       this.notifie.creatednotification(this.profil.id,message,Objet);
       this.router.navigate(['/shop']);
      }
      else{
        alert(" Veuillez Renseigner les champs avant validation")
      }
    }

    categories(){
      this.router.navigate(['/shop-product']);

    }

    bulick(e){
      this.router.navigate(["/platform",{menu:e}]);
    }
    circuler(){
      this.router.navigate(["/shop-edit"]);
    }
    circule(){
      this.router.navigate(["/shoping-cart"]);
    }
    categoriesvoir(e){
      this.router.navigate(["/shop-edit",{categorie:e}]);
    }
voirBout(e){
      this.router.navigate(["/shop-edit",{id:e}]);
    }
    voirPro(e){
      this.router.navigate(["/shoping-cart",{id:e}]);
    }
}
