import { AuthService } from './../services/auth.service';
import { LoadService } from './../services/load.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Platform, AlertController, PopoverController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { storage } from 'firebase';
import * as firebase from 'firebase';
import { MenuVoyageComponent } from '../components/menu-voyage/menu-voyage.component';
import { MenusComponent } from '../components/menus/menus.component';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  itemsCollection: AngularFirestoreCollection<any[]>;
  itemsCollection1: AngularFirestoreCollection<any[]>;
  itemsCollection2: AngularFirestoreCollection<any[]>;
  itemsCollection3: AngularFirestoreCollection<any[]>;
  itemsCollection4: AngularFirestoreCollection<any[]>;
  itemCollections: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  items1: Observable<any>;
  items2: Observable<any>;
  items3: Observable<any>;
  items4: Observable<any>;
  usercon:any;
  con:string="transac";
  itemDoc: AngularFirestoreDocument<any>;
  profileUrl: Observable<string | null>;
  agenceCollection: AngularFirestoreDocument<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  connect: boolean;
  principal: any = [];
  profil:any;
  categoryCollection: AngularFirestoreCollection<any>;
  category: Observable<any[]>;
  role: any;
  iduser: any;
  picture: any;
  matricule: any;
  idDesc: string;
  info: any;
  price: any;
  credit: number;
  boutique: boolean;
  idUser: any;
  redit: any;
  matriculess: any;
  own: boolean;
  couverture: any;
  desc: any;
  titre: any;
  transport: any;
  commanderie: any;
  transiter: any;
  resrv: any;

  constructor(
    private storage:AngularFireStorage, 
    private afAuth: AngularFireAuth,
    public pour:LoadService,
    public popoverController: PopoverController,
    public gps:AuthService,
    private route: ActivatedRoute,
    private camera: Camera,
    private fireauth: AngularFireAuth, 
    private router: Router,
     private toastController: ToastController, 
     private platform: Platform,
      public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService
  ) { }

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
                this.recup();
                this.redit=this.profil.credit;
                        this.pour.dismiss();
                console.log(this.profil);
                console.log(this.profil.status);
                this.role = this.profil.status;
                this.idUser = this.profil.id;
                this.credit = this.profil.credit;
                if (this.role == 'Client'){
                  console.log ('ok')
                      this.setContent(this.idUser)
                }
                else {
                  console.log ('ok')
                  this.setContentF(this.idUser)
                }
              }
              else{
                this.credit = 0;
                this.connect = false ;
                this.connexionPresent();
                
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
      component: MenusComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    return  popover.present();
  }


  setContent(voyage) {
    console.log(voyage)
    this.categoryCollection = this.afs.collection<any>('reservations', ref => ref
      .where('user', '==', voyage).orderBy('date','desc'));
    this.category = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        this.idDesc = id;
        console.log(data)
        return { id, ...data };

      }))
    ); this.category.subscribe(data => {
      if (data.length != 0) {
        this.principal = data;
        console.log(this.principal)
      }
      else{
        this.presentToast("Vous n'avez aucun achat pour le moment!");
      }
    });
  
  }

  setContentF(voyage) {
    console.log(voyage)
    this.categoryCollection = this.afs.collection<any>('reservations', ref => ref
      .where('owner', '==', voyage));
    this.category = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        this.idDesc = id;
        console.log(data)
        return { id, ...data };

      }))
    ); this.category.subscribe(data => {
      if (data.length != 0) {
        this.principal = data;
        console.log(this.principal)
      }
      else{
        this.presentToast("Vous n'avez aucun achat pour le moment!");
      }
    });
  
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(ev.detail.value);
    this.con=ev.detail.value;
  }
recup(){
  this.itemsCollection1 = this.afs.collection('Commande', ref => ref.where('idClient', '==', this.profil.id)
  .where('type', '==', 'Repas').
  orderBy('date','desc')
  )
  ;
  this.items1 = this.itemsCollection1.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
    })
  );
    this.items1.subscribe(da=>{
      console.log(da);
      this.commanderie=da;
    })

if(this.profil.status=="Conducteur"){
  this.itemsCollection2 = this.afs.collection('Transport', ref => ref.where('idConducteur', '==', this.profil.id).orderBy('date','desc'))
  ;
}else{
  this.itemsCollection2 = this.afs.collection('Transport', ref => ref.where('idClient', '==', this.profil.id).orderBy('date','desc'))
  ;
}

this.items2 = this.itemsCollection2.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
  })
);
  this.items2.subscribe(da=>{
    this.transport=da;
  })

  
this.itemsCollection3 = this.afs.collection('Commande', ref => ref
.where('idClient', '==', this.profil.id)
.where('type', '==', 'Articles')
.orderBy('date','desc'));
this.items3 = this.itemsCollection3.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
  })
);
  this.items3.subscribe(da=>{
console.log(da);
    this.transiter=da;
  })

  this.itemsCollection4 = this.afs.collection('reservations', ref => ref.where('user', '==', this.profil.id).orderBy('dateDepart','desc'))
;
this.items4 = this.itemsCollection4.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
  })
);
  this.items4.subscribe(da=>{

    this.resrv=da;
  })
}
redic(col){
  this.router.navigate(["/colis",{id:col}]);
}
redice(col){
  this.router.navigate(["/restaurant-list",{id:col}]);
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
}
