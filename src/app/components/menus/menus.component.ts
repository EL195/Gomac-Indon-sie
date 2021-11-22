
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

/*import { AuthService } from './services/auth.service';
import { LoadService } from './services/load.service';
import { FirebaseService } from './services/firebase.service';*/

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";

import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  connect: boolean;
  connet: boolean;
  file:boolean;
  ideaCollection: AngularFirestoreCollection<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  itemsCollection1: AngularFirestoreCollection<any[]>;
  items1: Observable<any>;
  transCollection: AngularFirestoreCollection<any[]>;
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private popover:PopoverController,
    private fireauth: AngularFireAuth,
public pour:LoadService,public gps:AuthService,
	 private toastController: ToastController, public loadingController: LoadingController,
	  public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,

  ) { }

  ngOnInit(

  ) {
              //this.pour.present();
              this.fireauth.authState.subscribe((user)=> {
                if(user){
                  this.connect = true ;
                  if(user.email==="florentbamis@gmail.com"||user.email==="micheltanga0@gmail.com"){
                    this.connet = true ;
                  }
                  }
                  else{
                    //this.credit = 0;
                    this.connect = false ;
                  }
                  this.finish(user);
                })


  }
    finish(user) {

        this.pour.present();
        if(user){
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

                  if(da[0].admin){
                    this.connet = true ;
                  }

                  if(da[0].status!="Client"){
                      this.file=true;

                      this.pour.dismiss();
                  }
                }
                else{

                    this.pour.dismiss();
                    this.router.navigate(["/login"]);
                }

              })

          }

          this.pour.dismiss();

    }

  VoyageGo(){
    this.router.navigate(['/voyage-list']);
    this.ClosePopover();
  }

  checkin(){
    this.router.navigate(['/check']);
    this.ClosePopover();
  }
  logout(){
    this.afAuth.auth.signOut();
    this.ClosePopover();
  }

  login(){
    this.router.navigate(['/login']);
    this.ClosePopover();
  }


  circuler(){
    this.router.navigate(['/home']);
    this.ClosePopover();
  }

  ClosePopover()
  {
   this.popover.dismiss();
  }

  shop(){
    this.router.navigate(['/shop']);
    this.ClosePopover();
  }

  plat(){
    this.router.navigate(['/plat-list']);
    this.ClosePopover();
  }

  transac(){
    this.router.navigate(['/historique']);
    this.ClosePopover();
  }
  suggest(){
    this.router.navigate(['/suggestion']);
    this.ClosePopover();
  }
  notif(){
    this.router.navigate(['/notification']);
    this.ClosePopover();
  }
  credit(){
    this.router.navigate(['/creditation']);
    this.ClosePopover();
  }
  transfert(){
    this.router.navigate(['/transfert']);
    this.ClosePopover();
  }


  redirect() {
    window.open("http://afitra.cm/", "_self");
    this.ClosePopover();
    }



    bus(){
      this.router.navigate(['/bus']);
      this.ClosePopover();
      //this. non();
    }

    active(){
      this.router.navigate(['/listusers']);
      this.ClosePopover();
      //this. non();
    }



    vols(){
      this.router.navigate(['/vol']);
      this.ClosePopover();
    }

    hotel(){
      this.router.navigate(['/hotel']);
      this.ClosePopover();
      //this. non();
    }
}
