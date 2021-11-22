import { SoldeService } from './../services/solde.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../services/auth.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { app } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {

  credit={
    objet:"",
    content:"",
    idClient:"",
    date:firebase.firestore.FieldValue.serverTimestamp()
  };
  profil:any;
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  constructor(
    private emailComposer: EmailComposer,
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
    public servfire:FirebaseService,
    public notifie:SoldeService,
  ) { }
  ngOnInit() {
    this.fireauth.authState.subscribe((user) => {
      //  this.name = this.route.snapshot.paramMap.get('id');
        this.pour.dismiss();

        if (user) {
          console.log(user);
          this.itemsCollection = this.afs.collection('User', ref => ref.where('email', '==', user.email));
          this.items = this.itemsCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
          this.items.subscribe(da => {
            if (da) {
              console.log(da);
              this.profil = da[0];
              this.credit.idClient=this.profil.id;
              console.log(this.profil.id);
              //this.notifie.viewnotification(this.profil.id);

            } else {
              alert("vous n'etes pas connecter");
              this.pour.dismiss();
            }

          });

        }
        else {
          this.pour.dismiss();
        }
      })
  }
  save(){
    let vt =true;
    if(this.credit.objet==""||this.credit.content==""){
  alert( "Veuillez renseigner les champs avant validation");
    }
    else{
      /*this.emailComposer.isAvailable().then((available: boolean) => {
        if(available) {
        console.log(available);
        let email = {
          to: 'florentbamis@gmail.com',
          cc: 'florentbamis@gmail.com',
          subject: this.credit.objet,
          body: this.credit.content,
          isHtml: true
        }

        // Send a text message using default options
        this.emailComposer.open(email);
        }
       });
*/
       let emaili = {
        to: this.profil.email,
        cc: 'florentbamis@gmail.com',
        subject: this.credit.objet,
        body: this.credit.content,
        isHtml: true
      }

      this.afs.collection('Suggestion').add(this.credit);
      if(this.credit.idClient!=""){
      this.notifie.creatednotification(this.credit.idClient,this.credit.content,this.credit.objet);}
      // Send a text message using default options
      this.emailComposer.open(emaili);

    }
  }
}
