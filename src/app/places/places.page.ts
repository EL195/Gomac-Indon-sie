import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { MenuVoyageComponent } from '../components/menu-voyage/menu-voyage.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  homeCollection: AngularFirestoreCollection<any>;
  home: Observable<any[]>;
  principal: any = [];
  profileRef: AngularFirestoreDocument<any>;
  voyage: string;
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  idUser: any;
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  principal1: any = [];
  commentData: any = [];
  category: any;
  infos: any = [];
  correctCategory: any;
  idDesc: string;
  placeUser: any;
  
  constructor(
    public popoverController: PopoverController,
    public router: Router,
    private route: ActivatedRoute,
    //public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private fireauth: AngularFireAuth,
    public alertCtrl: AlertController,
    private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    private db: AngularFirestore,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.voyage = paramMap.get('item');
     // console.log(this.category);
      this.getPlaces(this.voyage);
    });

    this.fireauth.authState.subscribe((user)=> {
      if(user){
        //this.connect = true ;
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
         // this.redit=this.profil.credit;
                  //this.pour.dismiss();
          console.log(this.profil);
          console.log(this.profil.status);
         // this.role = this.profil.status;
          this.idUser = this.profil.id;
          
         // this.credit = this.profil.credit;
        //  this.nom = this.profil.nom;
         // this.prenom = this.profil.prenom;
         
         
        }
        else{
        
        }
         
        })
  
      }
      else{
    
      }
    })
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

  getPlaces(item){
    console.log(item)
    this.homeCollection = this.afs.collection<any>('places', ref => ref
    .where('voyageId', '==', item)
    .orderBy('numero','asc')
    );
  this.home = this.homeCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.home.subscribe(data => {

    this.principal = data;
    console.log(this.principal)
    

  });



  }

  async  buy(id, item){
     console.log(id)
     const confirm = await this.alertCtrl.create({
       // title: 'Use this lightsaber?',
       message: 'Etes vous sûre ?',
       buttons: [
         {
           text: 'Non',
           handler: () => {
             console.log('Non');
           }
         },
         {
           text: 'Oui',
           handler: () => {
             console.log('Oui');
             //console.log(this.principal[0].id)
            // const idDesc = this.principal[0].id;
             const refe = "places";
             this.profileRef = this.db.doc(`${refe}/${id}`);
             this.profileRef.update({
               statut : true,
               user : this.idUser
             });
             this.presentToast('Place choisie avec succès');
             this.router.navigate(['/voyage-detail' ,item]);
           }
         }
       ]
     });
    confirm.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  
}
