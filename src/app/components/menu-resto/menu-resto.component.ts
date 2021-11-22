import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-resto',
  templateUrl: './menu-resto.component.html',
  styleUrls: ['./menu-resto.component.scss'],
})
export class MenuRestoComponent implements OnInit {
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
  matricule: any;
  all: any = [];
  constructor(
    public pour:LoadService,
    public gps:AuthService,

    private fireauth: AngularFireAuth,
    private afAuth: AngularFireAuth,
     private router: Router,
     private popover:PopoverController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire:FirebaseService
  ) { }

  ngOnInit() {
          //this.pour.present();
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
                        this.pour.dismiss();
                console.log(this.profil);
                console.log(this.profil.status);
                this.role = this.profil.status;
                this.idUser = this.profil.id;
                this.credit = this.profil.credit;
              }
              else{
                this.credit = 0;
                
              }
               
              })
        
            }
            else{
           // this.pour.dismiss();
           this.credit = 0;
           this.connect = false ;
            }
          })
  }

  liste(){
    this.router.navigate(['/plat-list']);

  }
  menu(){
    this.router.navigate(['/menu-restaurant']);

  }
  resto(){
    this.router.navigate(['/restaurant']);

  }
  achat(){
    this.router.navigate(['/tans/tab2']);

  }

  login(){
    this.router.navigate(['/login']);
    this.ClosePopover();
  }

  goProfil(){
    this.ClosePopover();
    this.router.navigate(['/tabs/tab3']);
  }


  logout(){
    this.afAuth.auth.signOut();
    this.ClosePopover();
  }

  ClosePopover()
  {
   this.popover.dismiss();
  }

}
