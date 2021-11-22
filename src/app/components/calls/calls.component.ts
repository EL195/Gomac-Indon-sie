import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConnexionMessageComponent } from '../connexion-message/connexion-message.component';

@Component({
  selector: "app-calls",
  templateUrl: "./calls.component.html",
  styleUrls: ["./calls.component.scss"]
})
export class CallsComponent implements OnInit {
  categoryCollection: AngularFirestoreCollection<any>;
  category1: Observable<any[]>;
  principal: any = [];
  category: any;
  correctCategory : any;
  itemsCollection: AngularFirestoreCollection<any[]>;
  items: Observable<any>;
  profil:any;
  connect: boolean;
  role: any;
  idUser: any;
  boutique: boolean = false;
  
  
  constructor(
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    public router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private loadingController : LoadingController,
    private readonly afs: AngularFirestore,
    private fireauth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this. getContent();
  }

  goTo(){
    this.router.navigate(['/voyage-add']);
  }
  showAgence(item){
    this.router.navigate(['/agence' ,item]);
  }


  showDetail(item){
    this.fireauth.authState.subscribe((user)=> {
      if(user){
        this.router.navigate(['/voyage-detail' ,item]);
      }
      else{
        this.connexionPresent()
       // this.router.navigate(['/login']);
      }
    })  
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  getContent(){
    //console.log(category);
    this.categoryCollection = this.afs.collection<any>('voyages', ref => ref
   // .where('categoryArticle', '==', category)
    .orderBy('dateCreated','desc'));
  this.category = this.categoryCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      console.log(data)
      return { id, ...data };

    }))
  );   this.category.subscribe(data => {

    this.principal = data;
    console.log(this.principal)
    

  });



  }


  
}


