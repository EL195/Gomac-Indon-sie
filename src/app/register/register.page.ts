import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  repassword: string = '';
  error: string = '';
  username: string = '';
  image: number;
  profil={
    nom:"",
    prenom:"",
    tel:"",
    email:"",
    pays:"",
    departement:"",
    ville:"",
    quartier:"",
    password:"",
    repassword:"",
    pin:"",
    credit:0,
    status:"",
    modele:"",
    matricule:"",
    lat:0,
    long:0,
    visible :false
  }
  itemsCollection: AngularFirestoreCollection<any>;
  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,private afs: AngularFirestore,private database: AngularFirestore) {

  }

  ngOnInit() {
  }


  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  signup() {
    if (this.profil.password!=this.profil.repassword){
      this.afficher();
        }
    else
    {
      this.fireauth.auth.createUserWithEmailAndPassword(this.profil.email, this.profil.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          let fr={
            email:this.email,
            password:this.password,
            pin:res.user.uid,
            credit:0,
            status:this.profil.status


          }
          this.updateProfile(this.profil);
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });

    }


  }

  async afficher() {
    const loading = await this.loadingController.create({
      message: 'Les mots de passe ne correspondent pas, Veuillez réessayer ...',
      duration: 2000
    });
    await loading.present();
  }


  updateProfile(user) {
    console.log(user);
    if(user.status=="Client"){
        user.visible=true;
    }
    let fr=user;
    this.itemsCollection = this.database.collection('User');
    this.itemsCollection.add(fr);
    console.log(fr);
    this.router.navigateByUrl('/login');
      if(fr.email !=null)
      {

        console.log(user);


      }
   // this.fireauth.auth.onAuthStateChanged((user) => {

    //})
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }


  term(){
    this.router.navigate(['/term']);
  }

  policy(){
    this.router.navigate(['/policy']);
  }

  login(){
    this.router.navigate(['/login']);
  }


  visit(){
    this.router.navigate(['/tabs/tab1']);
  }


  forgot(){
    this.router.navigate(['/resetpass']);
  }
}
