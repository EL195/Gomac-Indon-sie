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
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-voyage-detail',
  templateUrl: './voyage-detail.page.html',
  styleUrls: ['./voyage-detail.page.scss'],
})
export class VoyageDetailPage implements OnInit {
  voyage: string;
  user: any = {};
  info : any = [];
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  commentCollection: AngularFirestoreCollection<any>;
  comment: Observable<any[]>;
  profileRef: AngularFirestoreDocument<any>;
  debiter : AngularFirestoreDocument<any>;
  principal: any = [];
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
  placeUser: any;
  categoryCollections: AngularFirestoreCollection<any>;
  categorys: Observable<any[]>;
  principal1: any = [];
  infos: any = [];
  
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

    this.route.paramMap.subscribe(paramMap => {
      this.voyage = paramMap.get('item');
     // console.log(this.category);
      this.setContent(this.voyage);


    });

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
              if (this.reste < 0){
                this.besoin = true;

              }
              this.getPlace(this.voyage, this.idUser);
              
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
  setContent(voyage) {
    this.categoryCollection = this.afs.collection<any>('voyages', ref => ref
      .where('idVoyage', '==', voyage));
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
      console.log(this.principal[0].idDetailArticle)
      this.info = this.principal[0];
      console.log(this.info)
      //console.log(this.info.description)
      this.price = this.info.prix;
     // this.showComent(

     } );


  }

  async presentPopover() {
    let ev: any;
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

  validate(){
    console.log(this.pin)
    console.log(this.pine)
    if(this.pine !== this.pin){
      console.log()
      this.presentToast("Votre Pin est incorrect ...");
    }
    else {
      if(this.place == undefined){
        this.presentToast("Veuillez saisir votre place ...");
      }
      else{

        this.checkPlace(this.place).subscribe((datas) => {
          console.log(datas)
          if (datas.length != 0) {
            this.presentToast("Cette place est déjà prise ...");
          }
          else {

            this.checkPlaceUser().subscribe((datass) => {
              console.log(datass)
              if (datass.length != 0) {
                this.presentToast("Vous avez déjà réservé ce voyage. Veuillez réserver un autre...");
              }
              else {
                this.RES =  'AGE' + Math.random().toString(36).substr(2, 9);
                let elt : any ={
                  nom : this.nom,
                  service : "Voyage",
                  user : this.idUser,
                  prix :this.info.prix,
                  owner :  this.info.user,
                  iti : this.info.depart + ' - '+ this.info.arrivee,
                  idVoyage : this.info.idVoyage,
                  place : this.place,
                  type : this.info.type,
                  dateDepart : this.info.dateDepart,
                  itineraire : this.info.depart+' - '+this.info.arrivee,
                  restePlaces : firestore.FieldValue.increment(1),
                  idReservation :  this.RES,
                  dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
                }
                this.database.collection('reservations').add(elt);
                //this.itemsCollection;
                this.openLoader();
                this.router.navigate(['/tickets']);
                this.addPlace(this.place, this.info.idVoyage);

              }
            });
          }
          });
    }
    }
  }
  checkPlace(place: any) {
    console.log(place)
    this.itemsCollection = this.afs.collection<any>('places', ref => ref
      .where('numero', '==', place)
      .where('statut', '==', true));
    return this.itemsCollection.valueChanges().pipe(first());
  }

  checkPlaceUser() {
   // console.log(place)
    this.itemsCollection = this.afs.collection<any>('places', ref => ref
      .where('user', '==', this.idUser)
      .where('voyageId', '==', this.info.idVoyage));
    return this.itemsCollection.valueChanges().pipe(first());
  }

  updateVpyage(id) {
    const refes = "voyages";
    this.profileRef = this.db.doc(`${refes}/${id}`);
    this.profileRef.update({
      restePlaces: firebase.firestore.FieldValue.increment(1)
    });
    this.debit();
  }
  debit() {
    console.log(this.profil.id)
    console.log(this.profil.id)
    const refe = "User";
    this.debiter = this.db.doc(`${refe}/${this.profil.id}`);
    this.debiter.update({
      credit: this.reste
    });
    this.router.navigate(['/tickets']);
  }

  goToAgence(item){
    this.router.navigate(['/agence', item]);
  }

  addPlace(place, idVoyage) {
    this.placee =  'PLC' + Math.random().toString(36).substr(2, 9);
    let elt : any ={
      idPlace : this.placee,
      user : this.idUser,
      numero :place,
      idVoyage : idVoyage,
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    }
    this.database.collection('Places').add(elt);
    //this.itemsCollection;
    this.openLoader();
    this.updateVpyage(this.info.id);
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

  placeShow(item){
    this.router.navigate(['/places' ,item]);
  }

  profila(){
    this.router.navigate(['/tabs/tab3']);
  }

  getPlace(voyage, user) {
    console.log(voyage)
      this.categoryCollections = this.afs.collection<any>('places', ref => ref
        .where('user', '==', user)
        .where('voyageId', '==', voyage)
       // .orderBy('voyageId', voyage)
        );
      this.categorys = this.categoryCollections.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
       //   this.idDesc = id;
          console.log(data)
          return { id, ...data };
  
        }))
      ); this.categorys.subscribe(data => {
  
        this.principal1 = data;
        console.log(this.principal1)
        //console.log(this.principal1[0].idDetailArticle)
        this.placeUser = this.principal1[0].numero;
        console.log(this.placeUser)
       
  
  
      });
  
  
  
  
    }
    

}
