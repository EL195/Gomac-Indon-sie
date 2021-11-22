import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuRestoComponent } from '../components/menu-resto/menu-resto.component';
import { PopoverController } from '@ionic/angular';
import { SoldeService } from './../services/solde.service';
import { LoadService } from './../services/load.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";
import { FirebaseService } from './../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  ideaCollection: AngularFirestoreCollection<any>;
  ideaCollection1: AngularFirestoreCollection<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  constructor(private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController,
    private afs: AngularFirestore,
    public alertController: AlertController) {

  }


  ngOnInit() {
    
   this.fireauth.authState.subscribe((user) => {
    //  this.name = this.route.snapshot.paramMap.get('id');
      
  
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
            this.router.navigate(['/tabs/']);
          } 

        });

      }
      
    })
  }


  term(){ 
    this.router.navigate(['/term']);
  }

  policy(){ 
    this.router.navigate(['/policy']);
  }

  inscription(){ 
    this.router.navigate(['/register']);
  }


  visit(){ 
    this.router.navigate(['/tabs/']);
  }


  forgot(){ 
    this.router.navigate(['/resetpass']);
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  login() {
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
         this.router.navigate(['/tabs']);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = "Vos paramètres de connexion ne sont pas correctes.";
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
