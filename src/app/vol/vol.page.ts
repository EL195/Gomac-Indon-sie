
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';
import { CompleteComponent } from '../components/complete/complete.component';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
  selector: 'app-vol',
  templateUrl: './vol.page.html',
  styleUrls: ['./vol.page.scss'],
})
export class VolPage implements OnInit {
  user : any = {};
  success : boolean;
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
    private http: HTTP
  ) { }

  ngOnInit() {
    /* Connected User Info */
    this.userProfile();

    this.complaintForm = this.fb.group({
      nomC : [
        '',
        [
          Validators.required
        ]
      ],
      cni : [''],
      phone : [''],
      email : ['', [Validators.required] ],
      depart : ['', [Validators.required] ],
      messageC : ['', [Validators.required] ]

    });

  }


  newComplaint(){
    console.log(this.complaintForm)
    if(this.send = true){
      this.messages = this.db.collection('serviceReservation');
      this.messages.add({
        "idreservation" : 'vol_' + '_' + Math.random().toString(36).substr(2, 9),
        "Passager" : this.complaintForm.value.nomC,
        "dateCreated" : firebase.firestore.Timestamp.fromDate(new Date()),
        "cni" : this.complaintForm.value.cni,
        "email" : this.complaintForm.value.email,
        "dated" :firebase.firestore.Timestamp.fromDate(new Date(this.complaintForm.value.depart)),
       // "destination" : this.complaintForm.value.messageC,
        "createdByID" : this.profil.id,
        "telephone": this.complaintForm.value.phone,
        "createdByName" : this.complaintForm.value.nomC,
        "service" : "Vol",
        "visible" : true,
        "sortie" : "",
        "ittienarire" : this.complaintForm.value.messageC,
        //"villedd" : this.complaintForm.value.villeDepart,
        "type" : "",
        "heure" : "",
      })
      .then(res => {
        console.log('Message Sent');
      /*  let httpOptions = {
          headers: new HttpHeaders({
            'enctype': 'multipart/form-data;',
            'Accept': 'plain/text',

            // 'auth': tempToken
          })

        };*/

        const headers = {'Content-Type': 'application/json;',};
        var formData: any = new FormData();
        formData.append("mail", this.complaintForm.value.email,);
        formData.append("destination", this.complaintForm.value.messageC);
        formData.append("telephone", this.complaintForm.value.phone);
        formData.append("cni", this.complaintForm.value.cni);
        formData.append("nom", this.complaintForm.value.nomC);
        formData.append("periode", this.complaintForm.value.depart);
        let jr={
            "mail": this.complaintForm.value.email,
            "destination": this.complaintForm.value.messageC,
            "telephone": this.complaintForm.value.phone,
            "cni": this.complaintForm.value.cni,
            "nom": this.complaintForm.value.nomC,
            "periode": this.complaintForm.value.depart,


        }
        this.http.post('https://afitra.cm/reserveonlineavion', jr, headers).then(
        (response) => console.log(response),
        (error) => console.log(error)
  )
  this.presentToast('Votre réservation a été envoyée');
        this.complaintForm.reset();
      })
      .catch(err => {
        console.log(err);
      });


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
        window.open("https://afitra.cm/voirvols", "_self");
        //this.ClosePopover();
        }

}

