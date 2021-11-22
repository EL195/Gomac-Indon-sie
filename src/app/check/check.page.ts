import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {
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
    this.getContent()
  }

  getContent(){
    //console.log(category);
    this.categoryCollection = this.afs.collection<any>('serviceReservation', ref => ref
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
    console.log(data)
    this.principal = data;
    console.log(this.principal)
    

  });



  }

  showDetail(item){
    this.router.navigate(['/checkin' ,item]);

  }

}
