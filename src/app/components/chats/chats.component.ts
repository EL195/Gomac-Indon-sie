import { SoldeService } from './../../services/solde.service';
import { FirebaseService } from './../../services/firebase.service';
import { AuthService } from './../../services/auth.service';
import { LoadService } from './../../services/load.service';
/*import { AuthService } from './../service/auth.service';*/
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

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"]
})
export class ChatsComponent implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  transCollection: AngularFirestoreCollection<any[]>;
  trans: Observable<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  profil:any;
  edit=false;
  read=false;
  engin=["Motor","Taksi","Bajaj","Bis","Pribadi","Truk","Tronton"];
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
  transporteur:any[];
  constructor( public notifie:SoldeService,public contactsService: ContactsService,private storage:AngularFireStorage, private afAuth: AngularFireAuth,public pour:LoadService,public gps:AuthService,
    private camera: Camera,private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,private database: AngularFirestore,
    public servfire:FirebaseService,    public modalController: ModalController,) { }

  ngOnInit() {
    this.pour.dismiss();
    this.pour.present();
 /*   this.validation(
      "yJ6YiFJxYG2M63XRdirG"
      ); this.pour.dismiss();*/
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
               //this.notifie.viewnotification(this.profil.id);
                console.log(this.profil);
                this.transport(this.profil);
              }

            })

        }
        else{
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
  transport(use){
console.log(use);
this.pour.dismiss();
if(use.status==="Conducteur"){
this.transCollection= this.afs.collection('Transport', ref => ref.where('visible', '==',true)
.where('engin', '==',use.modele)
.where('villedepart', '==',use.ville)
.orderBy('date','desc')
)
 this.trans=this.transCollection.snapshotChanges().pipe(
  map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
);
this.trans.subscribe(dart =>{
console.log(dart);
if(dart){
  this.transporteur=dart;


}
//this.pour.dismiss();
} )
}
else
{
  this.edit=true;
  this.transCollection= this.afs.collection('Transport', ref => ref.where('idClient', '==',use.id).orderBy('date','desc'))
 this.trans=this.transCollection.snapshotChanges().pipe(
  map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
);
this.trans.subscribe(dart =>{
console.log(dart);
if(dart){
  this.transporteur=dart;
}

//this.pour.dismiss();

} )
}
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
      if(this.profil.credit >= this.course.prix){

    if(this.course.type===""||this.course.engin===""||this.course.arrive===""||this.course.depart===""){
      //alert("Veuillez remplir le formulaire");
      this.presentToast("Silahakn isi formulir");
      }
      else{
       // alert("Veuillez patienter");
        this.presentToast("Silahkan tunggu");
    if(this.course.type!="Colis"){
        this.course.villedepart=this.profil.ville;
        this.course.villearrive=this.profil.ville;
        this.course.departlat=this.profil.lat;
        this.course.departlong=this.profil.long;
        this.course.arrivelat=this.profil.lat;
        this.course.arrivelong=this.profil.long;
        this.course.photo=this.profil.photo;
        this.course.idClient=this.profil.id;
    }else{
      if(this.course.photo!=""){
      //  this.uploadFile(this.course.photo);
        this.course.departlat=this.profil.lat;
        this.course.departlong=this.profil.long;
        this.course.arrivelat=this.profil.lat;
        this.course.arrivelong=this.profil.long;
        this.course.idClient=this.profil.id;
      }else{
        this.course.departlat=this.profil.lat;
        this.course.departlong=this.profil.long;
        this.course.arrivelat=this.profil.lat;
        this.course.arrivelong=this.profil.long;
        this.course.photo=this.profil.photo;
        this.course.idClient=this.profil.id;
      }
    //  this.gps.geographie()
    }


   //
    console.log(this.course);
    this.afs.collection('Transport').add(this.course);
    let objet= "Anda baru pesan kendaraan";
    let message=" Anda baru pesan kendaraan "+ this.course.type+" Dari "+this.course.villedepart +"Ke "+this.course.villearrive;
    this.notifie.creatednotification(this.profil.id,message,objet);
  }
    this.read=false;

}else{
    this.presentToast("Saldo anda tidak cupuk untuk transaksi ini")
}

  }
  uploadFile(file){
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

  }
  redir()
  {
    //alert("Vous allez utilisez la Map pour votre commande");
    this.presentToast("Gunakan Map untuk pesanan anda");
    this.router.navigate(['/course']);
  }
  redic(col)
  {
    // alert(col);
    this.router.navigate(['/colis', { id: col }]);
  }
  async validation(data:string) {
    const modal = await this.modalController.create({
      component: ValidationComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': data,

      }
    });
    return await modal.present();
  }
  async recherche(data:string) {
    const modal = await this.modalController.create({
      component: RechercheComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': data,

      }
    });
    return await modal.present();
  }
}
