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
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.page.html',
  styleUrls: ['./agence.page.scss'],
})
export class AgencePage implements OnInit {

  itemsCollection: AngularFirestoreCollection<any[]>;
  itemsCollections: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  usercon:any;
  itemDoc: AngularFirestoreDocument<any>;
  profileUrl: Observable<string | null>;
  agenceCollection: AngularFirestoreDocument<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  connect: boolean;
  principal: any = [];

  all: any = [];
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

  constructor(private storage:AngularFireStorage, 
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
    public servfire:FirebaseService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.matricule = paramMap.get('item');
      console.log(this.matricule);
     this.setContent(this.matricule);


    });

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

                this.all =  datas[0];
                this.matriculess =  this.all.user;
                this.couverture =  this.all.image;
                this.desc =  this.all.desc;
                this.titre =  this.all.nom;
                console.log(this.matricule)
                if (this.iduser === this.matriculess){
                  this.own = true;
                }
                
              }
              else {
               // this.presentToast("Bienvenue, veuiller créer votre agence pour continuer ...");
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

  checkAgence(v) {
    console.log(v)
    this.itemsCollections = this.afs.collection<any>('agences', ref => ref
      .where('user', '==', v));
    return this.itemsCollections.valueChanges().pipe(first());
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

  setContent(voyage) {
    console.log(voyage)
    this.categoryCollection = this.afs.collection<any>('voyages', ref => ref
      .where('idAgence', '==', voyage));
    this.category = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        this.idDesc = id;
        console.log(data)
        return { id, ...data };

      }))
    ); this.category.subscribe(data => {

      this.principal = data;
      console.log(this.principal)
      
  
    });
  
  }
  CreateVoyage(){
    this.router.navigate(['/voyage-add']);
  }


}
