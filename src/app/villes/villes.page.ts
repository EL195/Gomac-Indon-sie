import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment, IonSlides, PopoverController } from "@ionic/angular";
import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
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
import { FirebaseService } from './../services/firebase.service';
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MenuvComponent } from '../compoents/menuv/menuv.component';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.page.html',
  styleUrls: ['./villes.page.scss'],
})
export class VillesPage implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  principal: any = [];
  category: any;
  correctCategory : any;

  constructor(public platform: Platform,
    public popoverController: PopoverController,
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
    this.getVille();
    console.log("hello");
    this.pour.present();
    this.fireauth.authState.subscribe((user)=> {
      console.log("hello");
      if(user){
        console.log("hello");
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
     // this.platform.ready().then(() => this.loadMap());
        }
        else{
          console.log("hellojjjj");
         
          this.pour.dismiss();
        }
         
        })
  
      }
      else{
        console.log("hell");
        this.connect = false ;
      this.pour.dismiss();
      }
    })
  }

  goTo(){
    this.router.navigate(['/ville-add']);
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

  getVille(){
   /// console.log(category);
    this.categoryCollection = this.afs.collection<any>('villes', ref => ref
    .orderBy('libelle','asc')
    );
  this.category = this.categoryCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.category.subscribe(data => {

    this.principal = data;
    console.log(this.principal)
    

  });



  }

}
