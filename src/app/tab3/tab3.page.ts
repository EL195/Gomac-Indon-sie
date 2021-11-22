
import { MenusComponent } from '../components/menus/menus.component';
import { SoldeService } from './../services/solde.service';
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Platform, AlertController, PopoverController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { storage } from 'firebase';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  usercon:any;
  itemDoc: AngularFirestoreDocument<any>;
  profileUrl: Observable<string | null>;
  gpt:any;
  role=["Client","Conducteur","Boutique","Restaurant","Agence"];
  engin=["Moto","Taxi","Motocyclette","Bus","Personel","Camions","Grumier"];
  edit=false;
     ideas: Observable<any[]>;
     profil={
       nom:"",
       prenom:"",
       tel:"",
       email:"",
       pays:"",
       departement:"",
       ville:"",
       quartier:"",
       password:"",
       pin:"",
       credit:0,
       status:"",
       modele:"",
       matricule:"",
       photo:"",
       photoEngin:"",
       lat:0,
       long:0
     }
   ideaCollection: AngularFirestoreCollection<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  connect: boolean = false;
  constructor(
    public notifie:SoldeService,
    private storage:AngularFireStorage,
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
    public popoverController: PopoverController,
    private database: AngularFirestore,
    public servfire:FirebaseService) { }

 // async 
  ngOnInit() {
   // this.pour.present();
   this.pour.dismiss();
    this.openLoader();
   
   
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
     
    });


    //this.fireauth.authState.subscribe(async user => {
   
    //this.pour.present();
    await this.afAuth.authState.subscribe( (user) => {
      if (user) {
        this.connect=true;
   //   this.items=  this.afs.collection('User', ref => ref.where('email', '==',user.email))
   console.log(user);
   this.ideaCollection = this.afs.collection('User', ref => ref.where('email', '==', user.email))
   ;
   this.ideas = this.ideaCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return { id, ...data };
       });
     })
   );
  
    this.ideas.subscribe(  data =>{
     console.log(data);
     this.usercon=data[0];
     console.log(this.usercon)
   //  this.pour.present();

          this.gps.gps().then((resp) => {
           // this.pour.dismiss();
            console.log(resp);
            this.gpt=resp;
           let lati=resp.coords.latitude;
           let longi=resp.coords.longitude;
           console.log(this.gpt);
           console.log( this.usercon);
           this.notifie.viewnotification(this.usercon.id);
           if(this.gpt){
             this.profil.lat=this.gpt.coords.latitude;
 
             this.profil.long=this.gpt.coords.longitude;
           }
           if(this.usercon.nom){
             this.profil.nom=this.usercon.nom;
             console.log(this.profil.nom)
             console.log("ivi")
 
           }
           if(this.usercon.prenom){
             this.profil.prenom=this.usercon.prenom;
 
           }
           if(this.usercon.tel){
             this.profil.tel=this.usercon.tel;
 
           }
           if(this.usercon.email){
             this.profil.email=this.usercon.email;
 
           }
           if(this.usercon.pays){
             this.profil.pays=this.usercon.pays;
 
           }
           if(this.usercon.departement){
             this.profil.departement=this.usercon.departement;
 
           }
     
           if(this.usercon.ville){
             this.profil.ville=this.usercon.ville;
 
           }
     
           if(this.usercon.quartier){
             this.profil.quartier=this.usercon.quartier;
 
           }
     
       if(this.usercon.password){
       this.profil.password=this.usercon.password;
 
     }
 
     if(this.usercon.pin){
       this.profil.pin=this.usercon.pin;
 
     }
 
     if(this.usercon.credit){
       this.profil.credit=this.usercon.credit;
 
     }
 
     if(this.usercon.status){
       this.profil.status=this.usercon.status;
 
     }
 
     if(this.usercon.modele){
       this.profil.modele=this.usercon.modele;
 
     }
 
     if(this.usercon.matricule){
       this.profil.matricule=this.usercon.matricule;
 
     }
 
     if(this.usercon.lat){
       this.profil.lat=this.usercon.lat;
 
     }
 
     if(this.usercon.long){
       this.profil.email=this.usercon.email;
 
     }
     if(this.usercon.photoEngin){
      this.profil.photoEngin=this.usercon.photoEngin;

    }
     this.gps.geographie(this.profil.long,this.profil.lat).then((result: NativeGeocoderResult[]) =>{
      if(result){
       let paysage=result[0];
       this.profil.pays="";
       this.profil.ville="";
       this.profil.departement="";
      // alert(paysage.countryCode);
       this.profil.quartier="";
       if(paysage.countryCode){
         this.profil.pays=paysage.countryCode;
       }
       if(paysage.countryName){
         this.profil.pays+=";"+paysage.countryName;
       }
       if(paysage.administrativeArea){
         this.profil.departement=paysage.administrativeArea;
       }
       if(paysage.subAdministrativeArea){
         this.profil.departement+=";"+paysage.subAdministrativeArea;
       }
       if(paysage.locality){
         this.profil.ville=paysage.locality;
       }
       if(paysage.subLocality){
         this.profil.ville+=";"+paysage.subLocality;
       }
       if(paysage.thoroughfare){
         this.profil.quartier=paysage.thoroughfare;
       }
       if(paysage.subThoroughfare){
         this.profil.quartier=";"+paysage.subThoroughfare;
       }
 
      }
         this.pour.dismiss();
    }).catch(er=>{
      this.resentToast("Votre GPS est déconnecté");
    });
     // this.profil.long=0
      console.log("The user is  logged in!");
      this.pour.dismiss();
    //  this.pour.dismiss();
      this.loadingController.dismiss();
          
          })
         // let mat=await this.gps.geographie();
         // console.log(mat);
      
   })
  
      }else
      {
        console.log("The user is not logged in!");
        this.connexionPresent();
        this.connect = false ;
      //  alert("Vous n'etes pas connecter et vous ne pouvez pas avoir access à cette page ");

        this.pour.dismiss();
      //  this.pour.dismiss();
        this.loadingController.dismiss();
      //  this.router.navigate(['/login']);
      }
      
    })
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }
  
  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
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
      this.profil.photo=Pic;
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
        this.profil.photo=url;
        });
        })
      ).subscribe();
    
       }, (err) => {
      // Handle error this.imgPic = ref.getDownloadURL()
      console.log(err);
       });
  }

  photosaveEngin(){
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
      this.profil.photoEngin=Pic;
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
        this.profil.photoEngin=url;
        });
        })
      ).subscribe();
    
       }, (err) => {
      // Handle error this.imgPic = ref.getDownloadURL()
      console.log(err);
       });
  }
  save(){
    console.log("hello")
   // this.uploadFile(this.profil.photo);
    console.log(this.gpt);
    if(this.gpt.coords.latitude){
      this.profil.lat=this.gpt.coords.latitude;

      this.profil.long=this.gpt.coords.longitude;
    }
    console.log(this.usercon.id);
    console.log(this.profil);
    this.afs.collection('User').doc(this.usercon.id).update(this.profil);
    let objet= "Modification de Profil";
    let message=" Vous venez de modifier votre profil avec succes";
    this.notifie.creatednotification(this.usercon.id,message,objet);
    this.edit=false;
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenusComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    return  popover.present();
  }


  async connexionPresent() {
    //  let event : any ;
      const popover = await this.popoverController.create({
        component: ConnexionMessageComponent,
        cssClass: 'custom-class',
      //  event : ev,
        translucent: true
      });
      return  popover.present();
    }
    async resentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }
  
  }



