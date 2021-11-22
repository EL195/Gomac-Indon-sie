import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { map, first } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-voyage',
  templateUrl: './menu-voyage.component.html',
  styleUrls: ['./menu-voyage.component.scss'],
})
export class MenuVoyageComponent implements OnInit {
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
                this.checkAgence(this.idUser).subscribe((datas) => {
                  console.log(datas)
                  if (datas.length != 0) {
                    console.log(datas)
                    this.all = datas[0];
                    this.matricule = this.all.matriculeAgence;
                    console.log(this.matricule)
                    this.boutique = true;
                  }
                  else {
                   // this.presentToast("Bienvenue, veuiller créer votre agence pour continuer ...");
                  }
                  });
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

  login(){
    this.router.navigate(['/login']);
    this.ClosePopover();
  }


  agence(){
    this.ClosePopover();
    this.router.navigate(['/agence' ,this.matricule]);
  }

  goProfil(){
    this.ClosePopover();
    this.router.navigate(['/tabs/tab3']);
  }


  logout(){
    this.afAuth.auth.signOut();
    this.ClosePopover();
  }

  booking(){
    this.ClosePopover();
    this.router.navigate(['/reservation']);
  }

  tickets(){
    this.ClosePopover();
    this.router.navigate(['/tickets']);
  }

  achat(){
    this.ClosePopover();
    this.router.navigate(['/tabs/tab2']);
  }

  ClosePopover()
  {
   this.popover.dismiss();
  }
  
  notify(){
    this.ClosePopover();
    this.router.navigate(['/notification']);
  }

  ville(){
    this.ClosePopover();
    this.router.navigate(['/villes']);
  }

   checkAgence(v) {
    console.log(v)
    this.itemsCollection = this.afs.collection<any>('agences', ref => ref
      .where('user', '==', v));
    return this.itemsCollection.valueChanges().pipe(first());
  }


}
