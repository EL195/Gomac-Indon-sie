import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { MenusComponent } from '../components/menus/menus.component';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';
import { CompleteComponent } from '../components/complete/complete.component';
import { LoadService } from '../services/load.service';

import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { FcmService } from '../service/fcm.service';
import { RedirectComponent } from '../components/redirect/redirect.component';
import { NotifComponent } from '../components/notif/notif.component';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  categoryCollection: AngularFirestoreCollection<any>;
  categoryCollections: AngularFirestoreCollection<any>;
  categoryCollectionss: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  homeCollection: AngularFirestoreCollection<any>;
  home: Observable<any[]>;
  principal: any = [];
  principals: any = [];
  principalss: any = [];
  principal1: any = [];
  categorys: any;
  category: any;
  categoryss: any;
  correctCategory : any;
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
  nom: any;
  prenom: any;
  modele: any;
  active: boolean = false;


  constructor(
    public popoverController: PopoverController,
    private fireauth: AngularFireAuth,
    private storage:AngularFireStorage,
    private toastController: ToastController,
    private afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    public router: Router,
    public pour:LoadService,
    private fcmi: FcmService,
    private nativeAudio: NativeAudio,
    private fcm: FCM, public plt: Platform
  ) {
   /* this.plt.ready()
    .then(() => {






        this.fcm.getToken().then(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
          console.log(token);
        });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });
      this.fcm.subscribeToTopic('enappd');

      this.fcm.onTokenRefresh().subscribe(token => {
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
        console.log(token);
      });
    })*/
  //  this.fcmi.sendnotification("Recherche","Salut","bgvjs","bbjjhs");
  }

  ngOnInit() {
      //  this.pour.dismiss();
    this.pour.present();
   // this.fcmi.sendnotification("Recherche","Salut","bgvjs","bbjjhs");
    this.getVoyages();
    this.getCourses();
   // this.getDepot();
    this.getbanner();
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
                        //this.pour.dismiss();
                console.log(this.profil);
                console.log(this.profil.status);
                this.role = this.profil.status;
                this.idUser = this.profil.id;
                this.credit = this.profil.credit;
                this.nom = this.profil.nom;
                this.modele= this.profil.modele;
                this.prenom = this.profil.prenom;
                this.active = this.profil.visible;
                if (this.active==false || this.active==undefined){
                  console.log("Bloqué")
                  this.router.navigate(['/bloque']);
              }
                if (this.nom==="" || this.prenom==="" ){
                    this. complete();
                }
                else{
                  this.presentToast("Senang jumpa anda lagi"+ " "+ this.profil.prenom);
                }

              }
              else{
                this.credit = 0;
                this.connect = false ;
                this.presentToast("anda tidak konekt...");
              }

              })

            }
            else{
           // this.pour.dismiss();
           this.credit = 0;
           this.connect = false ;
           this.connexionPresent();
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

  showAgence(item){
    this.router.navigate(['/agence' ,item]);

  }


  showDetail(item){
    this.fireauth.authState.subscribe((user)=> {
      if(user){
        this.router.navigate(['/voyage-detail' ,item]);
      }
      else{
        this.connexionPresent()
       // this.router.navigate(['/login']);
      }
    })
  }
  courseItem(ids){
this.router.navigate(['/colis', { id: ids }]);
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


    bus(){
     // this.router.navigate(['/bus']);
      window.open("https://afitra.cm/voirbus", "_self");
      //this. non();
    }


    vols(){
      //
      window.open("https://afitra.cm/voirvols", "_self");
     // this.router.navigate(['/vol']);
      //this. non();
     // this.PlaySong();
    //this.callNotif();
    }

    hotel(){
     window.open("https://afitra.cm/voirhotel", "_self");
     // this.router.navigate(['/hotel']);
      //this. non();
    }

    async complete() {
      //  let event : any ;
        const popover = await this.popoverController.create({
          component: CompleteComponent,
          cssClass: 'custom-class',
        //  event : ev,
          translucent: true
        });
        return  popover.present();
      }


      async redirect() {
        //  let event : any ;
          const popover = await this.popoverController.create({
            component: RedirectComponent,
            cssClass: 'custom-class',
          //  event : ev,
            translucent: true
          });
          return  popover.present();
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


  plat(){
    this.router.navigate(['/plat-list']);
    //this.ClosePopover();
  }

  course(){
    this.router.navigate(['/home']);
    //this.ClosePopover();
  }

  goToCourse(){
    this.router.navigate(['/home']);
  }

  getbanner(){
    //const category = "home"
    this.homeCollection = this.afs.collection<any>('banner', ref => ref
    .orderBy('number','asc'));
  this.home = this.homeCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.home.subscribe(data => {


this.pour.dismiss();
    this.principal1 = data;
    console.log(this.principal1)


  });



  }

  VoyageGo(){
    this.router.navigate(['/voyage-list']);
  }
  circuler(){
    this.router.navigate(['/home']);
  }

platList(){
  this.router.navigate(['/plat-list']);
}

shop(){
  this.router.navigate(['/shop']);
}

getVoyages(){
  //console.log(category);
  this.categoryCollection = this.afs.collection<any>('voyages', ref => ref
 // .where('categoryArticle', '==', category)
  .orderBy('dateCreated','desc').limit(6));
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

getCourses(){
  this.categoryCollections = this.afs.collection<any>('Transport', ref => ref
  .where('status', '==', false)
  .orderBy('date','desc').limit(6));
this.categorys = this.categoryCollections.snapshotChanges().pipe(
  map(actions => actions.map(a => {
    const data = a.payload.doc.data() as any;
    const id = a.payload.doc.id;
    console.log(data)
    return { id, ...data };

  }))
);   this.categorys.subscribe(data => {

  this.principals = data;
  console.log(this.principals)
});
}

PlaySong(){
    this.nativeAudio.preloadSimple('uniqueId1', '../../assets/pretty.mp3').then(suc=>{console.log("succes")}).catch(er=>{console.log("error")});
    this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));

  }
  async callNotif() {
    //  let event : any ;
      const popover = await this.popoverController.create({
        component: NotifComponent,
        cssClass: 'custom-class',
      //  event : ev,
        translucent: true
      });
      return  popover.present();
    }



}

