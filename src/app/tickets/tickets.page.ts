import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, PopoverController, LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { Observable } from 'rxjs/internal/Observable';
import { map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { MenuVoyageComponent } from '../components/menu-voyage/menu-voyage.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  voyage: string;
  user: any = {};
  info : any = [];
  infos : any = [];
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  categoryCollections: AngularFirestoreCollection<any>;
  categorys: Observable<any[]>;
  commentCollection: AngularFirestoreCollection<any>;
  comment: Observable<any[]>;
  profileRef: AngularFirestoreDocument<any>;
  debiter : AngularFirestoreDocument<any>;
  principal: any = [];
  principals: any = [];
  commentData: any = [];
  category: any;
  correctCategory: any;
  idDesc: string;
  userName: string;
  place  : any;
  pin  : any;

  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  idUser: any;
  boutique: boolean = false;
  credit: any;
  nom: string;
  image: string;
  pine: any;
  price: any;
  reste: any;
  besoin: boolean;
  RES: string;
  placee: string;
  voyageId: any;
  
  constructor(
    public popoverController: PopoverController,
    public router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private fireauth: AngularFireAuth,
    private alertController: AlertController,
    private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    private db: AngularFirestore,
    public toastController: ToastController,
   // private socialShare: SocialSharing
  ) { }

  ngOnInit() {
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
         // this.pour.dismiss();
          console.log(this.profil);
          console.log(this.profil.status);
          this.role = this.profil.status;
          this.idUser = this.profil.id;
          this.credit = this.profil.credit;
          this.nom = this.profil.prenom + ' '+ this.profil.nom;
          this.image = this.profil.photo;
          this.pine = this.profil.pin;
          this.reste = this.credit - this.price
          this.setContent(this.idUser)
          
        }
        else{
          this.connect = false ;
          this.presentToast("Vous devez vous connecter ...");
          this.router.navigate(['/login']);
        }
         
        })
  
      }
      else{
  
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


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuVoyageComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    return  popover.present();
  }

  setContent(id) {
    this.categoryCollection = this.afs.collection<any>('reservations', ref => ref
      .where('user', '==', id)
      .orderBy('dateCreated','desc'));
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
      console.log(this.principal[0].idVoyage)
      this.info = this.principal[0];
      console.log(this.info)
      //console.log(this.info.description)
      this.price = this.info.prix;
     // this.showComent(
       this.getVoyage(this.principal[0].idVoyage);

     } );


  }
  getVoyage(idVoyage: any) {
    this.categoryCollections = this.afs.collection<any>('voyages', ref => ref
    .where('idVoyage', '==', idVoyage)
    .orderBy('dateCreated','desc'));
  this.categorys = this.categoryCollections.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };

    }))
  ); this.categorys.subscribe(data => {

    this.principals = data;
    console.log(this.principals)
    console.log(this.principals[0].idVoyage)
    this.infos = this.principals[0];
    console.log(this.infos)
    //console.log(this.info.description)
    this.price = this.infos.prix;
   } );
  }


  goTo(item){
    this.router.navigate(['/card' ,item]);
  }
}
