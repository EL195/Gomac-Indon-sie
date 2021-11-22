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
import { MenuVoyageComponent } from '../components/menu-voyage/menu-voyage.component';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.page.html',
  styleUrls: ['./voyage-list.page.scss'],
})
export class VoyageListPage implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  redit=-1;
  idUser: any;
  boutique: boolean = false;
  credit: any;
  agent : boolean = false;

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
    private afs: AngularFirestore,
    private database: AngularFirestore,
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
              if (datas.length != 0) {
                console.log(datas)
                this.boutique = true;
                this.presentToast("Bienvenue, veuiller créer votre agence pour continuer ...");
              }
              else {
               
              }
              });
          }
          else{
            this.credit = 0;
            this.connect = false ;
          }
           
          })
    
        }
        else{
       // this.pour.dismiss();
        }
      })
      
  
    }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuVoyageComponent,
      cssClass: 'custom-popover',
      event: ev,
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
    this.router.navigate(['/tabs/tab3']);

  }
 
  AddVoyage(){
    this.router.navigate(['/voyage-add']);

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

}
