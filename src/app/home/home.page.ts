import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, IonSlides, PopoverController } from "@ionic/angular";
import { AuthService } from './../services/auth.service';
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
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild("slider", { read: undefined, static: false }) slider: IonSlides;
  @ViewChild("segment", { read: undefined, static: false }) segment: IonSegment;
  slideOpts = {
    initialSlide: 1,
    speed: 100
  };

  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  redit=-1;
  idUser: any;
  boutique: boolean = false;
  credit: any;

  constructor(
    public popoverController: PopoverController,
    public platform: Platform,
    private storage:AngularFireStorage, 
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public gps:AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth,
     private router: Router,
      private toastController: ToastController,
       public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,private database: AngularFirestore,
    public servfire:FirebaseService
    ) {}

  ngOnInit() {
    //this.pour.present();
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
          this.redit=this.profil.credit;
                  this.pour.dismiss();
          console.log(this.profil);
          console.log(this.profil.status);
          this.role = this.profil.status;
          this.idUser = this.profil.id;
          this.credit = this.profil.credit;
          this.checkAgence(this.idUser).subscribe((datas) => {
            console.log(datas)
            if (this.role != "Conducteur") {
             // console.log(datas)
              //this.boutique = true;
              this.presentToast("Pesan sekarang..");
            }
            else {
             // this.presentToast("Bienvenue, veuiller créer votre course...");
            }
            });


      //	  this.transport(this.profil);
      //this.platform.ready().then(() => this.loadMap());
        }
        else{
          this.credit = 0;
          this.connect = false ;
        //  this.pour.dismiss();
        //this.connexionPresent();
        }
         
        })
  
      }
      else{
     // this.pour.dismiss();
     this.connexionPresent();
      }
    })

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

  

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

   checkAgence(v) {
    console.log(v)
    this.itemsCollection = this.afs.collection<any>('agences', ref => ref
      .where('user', '==', v));
    return this.itemsCollection.valueChanges().pipe(first());
  }

  profile(){
    this.router.navigate(['/profile']);

  }
 /* presentPopover($event1){
    console.log($event1);
  }
*/
  AddVoyage(){
    this.router.navigate(['/voyage-add']);

  }

  async segmentChanged(event: any) {
    // get the id of the current slide as number
    const slideId = +(event.detail.value as string).replace("ion-sb-", "");
    // slide to the selected segment
    await this.slider.slideTo(slideId, 100);
  }

  async slideChanged() {
    // set the segment to the active slide
    this.segment.value =
      "ion-sb-" + (await this.slider.getActiveIndex()).toString();
  }

  CreateAgence(){
    this.router.navigate(['/agence-add']);

  }

  espace(){
    if(this.role=="Agence"){
      this.router.navigate(['/agence' , this.idUser]);
    }
    

  }

  CreateVoyage(){
    this.router.navigate(['/voyage-add']);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuvComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    return  popover.present();
  }
}
