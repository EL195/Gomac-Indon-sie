import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadService } from './load.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoldeService {

  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  usercon:any;
  //pourcentage=0;
  itemDoc: AngularFirestoreDocument<any>;
  constructor(
    private local:LocalNotifications,
    private load:LoadService ,
    private toastController: ToastController,
    private afs: AngularFirestore) { }

  creditation(id,montant){
  this.load.dismiss();
  //this.load.present();
  console.log(id);
  console.log(montant);
  //console.log(firebase.database.ServerValue.TIMESTAMP);
  this.afs.collection('Transaction').add({
    objet:"Créditation ",
    montant:montant ,
    client:id,
    date:firebase.firestore.FieldValue.serverTimestamp()
  });
   this.afs.collection('User').doc(id).update({credit:firebase.firestore.FieldValue.increment(montant)});
   let vari= new Date();
let message="Créditation d'un montant de "+montant+" Fcfa, à "+ vari.toUTCString();
let objet="Créditation de votre compte"
this.creatednotification(id,message,objet);
console.log(objet);
this.load.dismiss();
  }
  debitCredit(id,montant):any{
    this.load.dismiss();
    this.load.present();
    let vart=true;
    this.afs.collection('User').doc(id).valueChanges().subscribe((data:any)=>{

      if(data.credit>montant && vart){
        vart=false;
        this.afs.collection('User').doc(id).update({credit:firebase.firestore.FieldValue.increment(-montant)});
        this.afs.collection('Transaction').add({
          objet:"Débit ",
          montant:-montant ,
          client:id,
          date:firebase.firestore.FieldValue.serverTimestamp()
        });
         let vari= new Date().toUTCString();
     let message="Débit d'un montant de "+montant+" Fcfa, à "+vari;
     let objet="Débit de votre compte"
     this.creatednotification(id,message,objet);
     this.load.dismiss();
     vart=false;
     console.log(message);
     return true;
      }
      else{
        let message="Le montant de votre solde est insuffisant pour effectuer l'opération ";
     let objet="Crédit Insuffisant";
     this.creatednotification(id,message,objet);
     this.load.dismiss();
     console.log(message);
     return false;
      }
    });
    
 
    }

  creatednotification(id,message,objet){
    this.afs.collection('notification').add({
      date:firebase.firestore.FieldValue.serverTimestamp(),
      objet:objet,
      message:message,
      client:id,
      status:false
    })
  }

  viewnotification(id){
    let vr=true;
this.itemsCollection=this.afs.collection('notification', ref => ref.where('client', '==', id).where('status', '==', false))
this.items=this.itemsCollection.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
  })
);
this.items.subscribe(da=>{
  console.log(da);
  if(vr && da[0]) {
    this.presentToast(da[0].message);
  da.forEach(element => {
   // this.presentToast(element.message);
    console.log(element);
    this.local.schedule([{
      id: 1,
      text: element.message,
      title: element.objet,
      icon: '/assets/img/logo.png'
     }]);
    
  });
vr=false;
  }

}) 
  }
  transferezcredit(id1,id2,montant){
//let vrt=this.debitCredit(id1,montant);
//console.log(vrt);
//if(vrt){
  //this.creditation(id2,montant);
//}
let limit=true

let vart=true;
    this.afs.collection('User').doc(id1).valueChanges().subscribe((data:any)=>{

      if(data.credit>montant && vart){
        vart=false;
        this.afs.collection('User').doc(id1).update({credit:firebase.firestore.FieldValue.increment(-montant)});
        this.afs.collection('Transaction').add({
          objet:"Débit ",
          montant:-montant ,
          client:id1,
          date:firebase.firestore.FieldValue.serverTimestamp()
        });
         let vari= new Date().toUTCString();
     let message="Débit d'un montant de "+montant+" Fcfa, à "+vari;
     let objet="Débit de votre compte"
     this.creatednotification(id1,message,objet);
     this.load.dismiss();
     vart=false;
     console.log(message);
     if(limit){
      this.creditation(id2,montant);
      limit=false;
     }
    
     //return true;
      }
      else{
        let message="Le montant de votre solde est insuffisant pour effectuer l'opération ";
     let objet="Crédit Insuffisant";
     this.creatednotification(id1,message,objet);
     this.load.dismiss();
     console.log(message);
    // return false;
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
