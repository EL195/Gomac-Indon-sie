import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, PopoverController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { MenuvComponent } from '../compoents/menuv/menuv.component';

@Component({
  selector: 'app-ville-add',
  templateUrl: './ville-add.page.html',
  styleUrls: ['./ville-add.page.scss'],
})
export class VilleAddPage implements OnInit {
  ville: string = '';
  comment: Observable<any[]>;
  idDesc: string;
  principal: any = [];
  commentData: any = [];
  itemsCollection: AngularFirestoreCollection<any>;
  constructor(
    public popoverController: PopoverController,
    private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore) {

  }

  ngOnInit() {
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

  async afficher() {
    const loading = await this.loadingController.create({
      message: 'Traitement en cours,  veuillez patienter ...',
      duration: 2000
    });
    await loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  checkVille(v) {
    console.log(v)
    this.itemsCollection = this.afs.collection<any>('villes', ref => ref
      .where('libelle', '==', v));
    return this.itemsCollection.valueChanges().pipe(first());
  }

  save(){

    this.checkVille(this.ville).subscribe((data) => {
      console.log(this.ville)
      console.log(data)
      if (data.length != 0) {
        console.log(data)
        this.presentToast("Cette ville existe déjà, Veuillez insérer une autre ...");
      }
      else {
        let elt : any ={
          libelle : this.ville,
          dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
        }
        this.itemsCollection = this.database.collection('villes');
        this.itemsCollection.add(elt);
        this.openLoader();
        this.router.navigate(['/villes']);
      }
      });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuvComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    return  popover.present();
  }
}
