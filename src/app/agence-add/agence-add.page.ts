import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Platform, AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { storage } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-agence-add',
  templateUrl: './agence-add.page.html',
  styleUrls: ['./agence-add.page.scss'],
})
export class AgenceAddPage implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  usercon:any;
  itemDoc: AngularFirestoreDocument<any>;
  profileUrl: Observable<string | null>;
  imgPic : Observable<any>;
  agence={
    nom:"",
    description:"",
    tel:"",
    email:"",
    pays:"",
    departement:"",
    ville:"",
    quartier:"",
    matricule:"",
    photo:"",
    lat:0,
    long:0
  }
  agenceCollection: AngularFirestoreDocument<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  connect: boolean;
  profil:any;
  role: any;
  iduser: any;
  picture: any;
  idAgence: string;
  elt: { nom: string; desc: string; email: string; tel: string; user: any; ville: string; pays: string; quartier: string; lat: string; long: string; image: string; matriculeAgence: string; dateCreated: firebase.firestore.Timestamp; };

  constructor(private storage:AngularFireStorage, 
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public gps:AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth, 
    private router: Router,
     private toastController: ToastController, 
     private platform: Platform,
      public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService) { }


  ngOnInit() {
    this.pour.present();
    this.fireauth.authState.subscribe((user)=> {
      if(user){
        this.connect = true ;
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
          console.log(this.profil.status);
          this.role = this.profil.status;
          this.iduser = this.profil.id;
          

      //	  this.transport(this.profil);
      //this.platform.ready().then(() => this.loadMap());
        }
        else{
          this.connect = false ;
          this.pour.dismiss();
        }
         
        })
  
      }
      else{
      this.pour.dismiss();
      }
    })
  }



  takePic(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      //console.log(imageData);
      let Pic = 'data:image/jpeg;base64,' + imageData;
      const filePath = `agence_photos/${this.iduser}.jpeg`;
      //alert(filePath);
      const ref = this.storage.ref(filePath);
      const task = ref.putString(Pic, 'data_url');
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          //this.imgPic = (url); // <-- do what ever you want with the url..
        //  this.updateProfilePhoto(url);
        this.picture = url ;
        
          });
        })
      ).subscribe();

     }, (err) => {
      // Handle error this.imgPic = ref.getDownloadURL()
      console.log(err);
     });

  }

  updateProfilePhoto(url){
  //  this.agenceCollection = this.database.doc(`${this.user.role}/${this.iduser}`);
    this.agenceCollection.update({
      photoURL : url
    });
  }

  save(){
    this.checkAgence(this.agence.nom).subscribe((data) => {
      console.log(data)
      if (data.length != 0) {
        console.log(data)
        this.presentToast("Cette agence existe déjà, Veuillez insérer une autre ...");
      }
      else {
        this.idAgence =  'AGE' + Math.random().toString(36).substr(2, 9);
        let elt : any ={
          nom : this.agence.nom,
          desc : this.agence.description,
          email : this.agence.email,
          tel : this.agence.tel,
          user : this.iduser,
          ville : "",
          pays : "",
          quartier : "",
          lat : "",
          long : "",
          image :"",
          matriculeAgence :  this.idAgence,
          dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
        }
        this.database.collection('agences').add(elt);
        //this.itemsCollection;
        this.openLoader();
        this.router.navigate(['/agence' ,this.idAgence]);

      }
      });
  }

  checkAgence(v) {
    console.log(v)
    this.itemsCollection = this.afs.collection<any>('agences', ref => ref
      .where('nom', '==', v));
    return this.itemsCollection.valueChanges().pipe(first());
  }
  

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Traitement en cours,  veuillez patienter ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }
}
