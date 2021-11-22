
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';
import { CompleteComponent } from '../components/complete/complete.component';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import { HttpModule } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media/ngx';
 import { HTTP } from '@ionic-native/http/ngx';
import { LoadService } from '../services/load.service';
import { RestApiService } from '../rest-api.service';
import { HttpClient } from '@angular/common/http';
//import { HttpClient , Headers, RequestOptions} from '@angular/common/http'
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { NotifComponent } from '../components/notif/notif.component';
import { SoldeService } from '../services/solde.service';
@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {
  user : any = {};
  success : boolean;
  condense : boolean =false;
  complaintForm : FormGroup;
  messages : AngularFirestoreCollection<any>;
  send: boolean;
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
  films: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  redit=-1;
  idUser: any;
  boutique: boolean = false;
  credit: any;
  agent : boolean = false;
  nom: any;
  parcour: any;
  typique:any;
  prenom: any;
  modele: any;
  nomc: any;
  phony: any;
  emaily: any;


  constructor(
    public popoverController: PopoverController,
    private fb : FormBuilder,
    private db : AngularFirestore,
    public router : Router,
    private fireauth: AngularFireAuth,
    private storage:AngularFireStorage,
    private afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    public toastController: ToastController,
    private http: HTTP,
    public pour:LoadService,
    public rest:RestApiService,
    public modalController: ModalController,
    private nativeAudio: NativeAudio,
    private media: Media,
    private ht: HttpClient,
    public notifie:SoldeService
  ) { }

  ngOnInit() {
    /* Connected User Info */
    this.pour.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    this.userProfile();
   /* var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
*/
    this.complaintForm = this.fb.group({
      nomC : [
        '',
        [
          Validators.required
        ]
      ],
      cni : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      email : ['', [Validators.required] ],
      depart : ['', [Validators.required] ],
      heure : ['', [Validators.required] ],
      villeDepart : ['', [Validators.required] ],
      sortie : ['', [Validators.required] ],
      type : ['', [Validators.required] ]

    });

  }


  newComplaint(){
    if(this.send = true){
      this.messages = this.db.collection('serviceReservation');
      this.messages.add({
        "idreservation" : 'bus_' + '_' + Math.random().toString(36).substr(2, 9),
        "Passager" : this.complaintForm.value.nomC,
        "dateCreated" : firebase.firestore.Timestamp.fromDate(new Date()),
        "cni" : this.complaintForm.value.cni,
        "email" : this.complaintForm.value.email,
        "dated" :firebase.firestore.Timestamp.fromDate(new Date(this.complaintForm.value.depart)),
        "type" : this.complaintForm.value.type,
        "heure" : this.complaintForm.value.heure,
        "ittienarire" : this.complaintForm.value.sortie + ' - ' + this.complaintForm.value.villeDepart,
        "createdByID" : this.profil.id,
        "telephone": this.complaintForm.value.phone,
        "createdByName" : this.complaintForm.value.nomC,
        "service" : "Bus",
        "sortie" : "",
        "visible" : true
      })
      .then(res => {
        console.log('Message Sent');
const heades = {'Content-Type': 'application/json;','Accept': 'application/json;'};
      })
      .catch(err => {
        console.log(err);
      });


      let hr= new Date(this.complaintForm.value.heure).getHours();
      let ht=new Date(this.complaintForm.value.depart);
      console.log(ht);
      console.log(ht.getUTCDate());
      console.log(ht.getUTCMonth());
      let th=ht.getUTCDate()+"-"+(ht.getUTCMonth()+1) +"-"+ht.getFullYear();
      let voyage={
          "mail":this.complaintForm.value.email,
          "telephone":this.complaintForm.value.phone,
          "nom":this.complaintForm.value.nomC,
          "cni":this.complaintForm.value.cni,
          "depart":this.complaintForm.value.villeDepart,
          "destination":this.complaintForm.value.sortie,
          "heure":hr,
          "jour":th,
          "type":this.complaintForm.value.type,
          "itineraire" : this.complaintForm.value.sortie + ' - ' + this.complaintForm.value.villeDepart,
          "createdByID" : this.profil.id,
          "createdByName" : this.complaintForm.value.nomC,
          "service" : "Bus",
          "visible" : true,
          "dateCreated" : firebase.firestore.Timestamp.fromDate(new Date()),

      };

      console.log(voyage);

      this.db.collection("Bus").add(voyage);
      let frr= new Date().getUTCDate();
      let objet="Achat du billet de bus le " + frr;
      let message=" vous avez demandez l'achat d un billet de bus allant de "+this.complaintForm.value.villeDepart + ' à ' + this.complaintForm.value.sortie + "pour la date du "+ th+ "à "+ hr;

      this.notifie.creatednotification(this.profil.id,objet,message);


        this.presentToast('Votre réservation a été envoyée');
              this.complaintForm.reset();




    }
    else {
      this.router.navigate(['/login']);
    }




  }

   /* Pull up Profile if user is logged in*/
   async userProfile(){
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
          this.nomc = this.profil.prenom + ' ' + this.profil.nom;
          this.phony = this.profil.tel;
          this.emaily = this.profil.email;
          this.verification();
          if (this.nom==="" || this.prenom==="" ){
              this. complete();
          }
          else{
            this.presentToast("Content de vous revoir"+ " "+ this.profil.prenom);
          }


        }
        else{
          this.credit = 0;
          this.connect = false ;
          this.presentToast("Vous n'êtes pas connecté(e)...");

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
    verification() {
  //     this.platfo();
        this.ht.get('https://cors-anywhere.herokuapp.com/https://www.afitra.cm/mobile/ville')
        .subscribe(async (data: any) => {

            console.log(data.ville);
            this.parcour=data.ville;
            this.typique=data.bus;
  this.condense=true;
  this.pour.dismiss();
        })


      //
   //   this.platfo();

      //
  //  this.PlaySong();
       // this.callNotif();
        const headers = {'Content-Type': 'application/json;','Accept': 'application/json;'};
      //  console.log( "ddcdc");
      this.http.get("https://www.afitra.cm/mobile/ville",{},{})
  .then(res => {
  console.log(res.data);
  this.parcour=JSON.parse(res.data).ville;
  this.typique=JSON.parse(res.data).bus;
  this.condense=true;
  this.pour.dismiss();
})
  .catch(error => {
  console.log(error);
  this.pour.dismiss();
});

    }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

      redirect() {
        window.open("https://afitra.cm/voirbus", "_self");
        //this.ClosePopover();
        }



}

