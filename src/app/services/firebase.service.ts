import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadService } from './../services/load.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 shirtCollection: AngularFirestoreCollection<any>;
  shirts: Observable<any>;

  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore,public load:LoadService) { }

  logout() {
    this.fireauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })}
    recover(email) {
      this.load.present();
      this.fireauth.auth.sendPasswordResetEmail(email)
        .then(data => {
          console.log(data);
          this.load.dismiss();
          //this.presentToast('Password reset email sent', false, 'bottom', 1000);
          this.router.navigateByUrl('/login');
        })
        .catch(err => {
          console.log(` failed ${err}`);
          this.load.dismiss();
      
        });
    }
    login(email,password) {
      this.load.present();
      this.fireauth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            console.log(res.user);
            this.load.dismiss();
            this.router.navigate(['/home']);
          }
        })
        .catch(err => {
          this.load.dismiss();
          console.log(`login failed ${err}`);
         
        });
    }
    signup(email,password) {
      this.fireauth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            console.log(res.user);
            this.load.dismiss();
          }
        })
        .catch(err => {
          console.log(`signup failed ${err}`);
          this.load.dismiss();
          
        });
    }
    async islogin(){
      this.load.present();
      this.fireauth.authState.subscribe(async user => {
        if (user) {
          console.log(user);
        // let dat= this.setup(user.email);
        // this.shirtCollection=this.setup(user.email);
         return await this.afs.collection('User', ref => ref.where('email', '==',user.email));
       
        }else{
          this.load.dismiss();
          return null
        }

       // this.load.dismiss();
      })
    }

    
    userDetails() {
      return this.fireauth.user
    }

    /*setup(email):any{
      this.load.present();
      return await this.afs.collection('User', ref => ref.where('email', '==', email));
      // .snapshotChanges() returns a DocumentChangeAction[], which contains
      // a lot of information about "what happened" with each change. If you want to
      // get the data and the id use the map operator.
     
    }*/
    
}
