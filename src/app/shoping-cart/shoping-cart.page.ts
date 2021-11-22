import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { MenuRestoComponent } from '../components/menu-resto/menu-resto.component';
import { PopoverController } from '@ionic/angular';
import { SoldeService } from './../services/solde.service';
import { LoadService } from './../services/load.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { map, finalize, first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";
import { FirebaseService } from './../services/firebase.service';
import { AuthService } from '../services/auth.service';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as firebase from 'firebase';
import { ConnexionMessageComponent } from '../components/connexion-message/connexion-message.component';


@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.page.html',
  styleUrls: ['./shoping-cart.page.scss'],
})
export class ShopingCartPage implements OnInit {
  vio = true;
  suivi:number;
  ideaCollection: AngularFirestoreCollection<any>;
  ideaCollection1: AngularFirestoreCollection<any>;
  itemsCollection: AngularFirestoreCollection<any[]>;
  // itemDoc: AngularFirestoreDocument<any>;
  items: Observable<any>;
  items1: Observable<any>;
  transCollection: AngularFirestoreCollection<any[]>;
  uploadPercent: Observable<number>;
  itemDoc: AngularFirestoreDocument<any>;
  itemDo: AngularFirestoreDocument<any>;
  itemDol: AngularFirestoreDocument<any>;
  itemDo1: AngularFirestoreDocument<any>;
  itemDol1: AngularFirestoreDocument<any>;
  ite: Observable<any>;
  vrestau = "";
  item: Observable<any>;
  item1: Observable<any>;
  item0: Observable<any>;
  item10: Observable<any>;
  profil: any;
  edit = true;
  name: string;
  vefstat = false;
  //vefcreat="";
  restau: string = "";
  comman = {
    nom: "",
    status: false,
    visible: false,
    produit: "",
    date: firebase.firestore.FieldValue.serverTimestamp(),
    restau: "",
    idClient: "",
    prix: 0,
    type: "Repas",
    photo: ""
  };

  course = {
    type: "",
    date: firebase.firestore.FieldValue.serverTimestamp(),
    villedepart: "",
    villearrive: "",
    depart: "",
    photo: "",
    departlat: 0,
    departlong: 0,
    arrive: "",
    arrivelat: 0,
    arrivelong: 0,
    engin: "",
    idClient: "",
    idConducteur: "",
    idCommande: "",
    visible: true,
    status: false,
    prix: 0
  };
  plat: any;
  // course:any;
  view = true;
  //style=["Homme","Femme","Enfants","Bébé"];
  disponible = [true, false];
  food = {
    nom: "",
    description: "",
    disponible: false,
    created: "",
    date: firebase.firestore.FieldValue.serverTimestamp(),
    Boutique: "",
    style: "",
    photo: "",
    prix: 0,
    promo: 0,
    status: true,
    visible: true,


  };
  commentaire = "";
  rcom = 0;
  plati: any;
  comments: any[];
  noConnect: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public popoverController: PopoverController,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    public pour: LoadService,
    public gps: AuthService,
    private camera: Camera,
    private fireauth: AngularFireAuth,
    //  private imagePicker: ImagePicker,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private afs: AngularFirestore,
    private database: AngularFirestore,
    public servfire: FirebaseService,
    public notifie: SoldeService,

  ) { }

  ngOnInit() {
    // this.comments=[];
    this.name = this.route.snapshot.paramMap.get('id');
    let resto = this.route.snapshot.paramMap.get('resto');
    let menu = this.route.snapshot.paramMap.get('menu');
    this.userud();
    if (menu != null && menu != "") {
      this.itemsCollection = this.afs.collection('Articles', ref => ref.where('style', '==', menu).where('visible', '==', true));
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
          this.plat = da;
        }

      });
    }
    else {
      if (resto != null && resto != "") {
        this.restau = resto;
        this.itemsCollection = this.afs.collection('Articles', ref => ref.where('Boutique', '==', resto).where('visible', '==', true));
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
            this.plat = da;
            this.plati = this.plat;
          }

        });
      } else {
        if (this.name != null && this.name != "") {
          this.view = false;

          this.itemDoc = this.afs.collection('Articles').doc(this.name);
          this.itemDoc.valueChanges().subscribe((data) => {
            console.log(data);
            this.food.nom = data.nom;
            this.food.description = data.description;
            this.food.style = data.style;
            this.food.prix = data.prix;
            this.food.promo = data.promo;
            this.food.photo = data.photo;
            this.food.Boutique = data.Boutique;
            this.food.disponible = data.disponible;
            this.food.photo = data.photo;
            this.food.created = data.created;
            this.food.date = firebase.firestore.FieldValue.serverTimestamp();
            console.log(this.food);

            this.voi();
            this.fuis(this.food.Boutique);

          });


        }
        else {
          this.itemsCollection = this.afs.collection('Articles', ref => ref.where('visible', '==', true));
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
              this.plat = da;
              this.plati = this.plat;
            }

          });
        }
      }
    }
  }
    fuis(Boutique: string) {
        console.log(this.food.Boutique);
        this.itemDol1 = this.afs.collection('Boutique').doc(Boutique);
        this.item10 = this.itemDol1.valueChanges();
        this.item10.subscribe(data => {
          console.log(data);

          this.suivi = Math.floor(250 * this.gps.calculateDistance(this.course.departlat, this.course.arrivelat, this.course.departlong, this.course.arrivelong));

            if(200>this.suivi){
                this.suivi=200;
            }
        })
    }
  userud() {
    this.fireauth.authState.subscribe((user) => {
      //  this.name = this.route.snapshot.paramMap.get('id');
      this.pour.dismiss();

      if (user) {
        console.log(user);
        this.ideaCollection = this.afs.collection('User', ref => ref.where('email', '==', user.email));
        this.items1 = this.ideaCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
        this.items1.subscribe(da => {
          if (da) {
            this.noConnect = true;
            console.log(da);
            this.profil = da[0];
            this.vrestau = this.profil.id;
            //his.derange=this.profil.id;
            console.log(this.profil.id);
            if (this.profil.status == 'Boutique') {
              this.vefstat = true;
            }
          //  this.notifie.viewnotification(this.profil.id);

            this.pour.dismiss();
          } else {
            this.presentToast("Vous n'etes pas connectée");
            this.pour.dismiss();
            this.noConnect = false;
          }

        });

      }
      else {
        this.pour.dismiss();
      }
    })
  }
  redic(col) {
    // alert(col);
    this.router.navigate(['/shoping-cart', { id: col }]);
  }
  voi() {
    this.ideaCollection1 = this.afs.collection('CommentaireArticles', ref => ref.where('restaurant', '==', this.name))
    this.ideaCollection1.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(da => {
      console.log(da);
      this.rcom = da.length;
      this.comments = da;
    })
  }
  deleteR() {

    let objet = " Suppresion du Article " + this.food.nom;
    let de = new Date().toUTCString();
    let message = "L' Article " + this.food.nom + ". a bien été supprimer le " + de + ". Pour en savoir plus, veuillez contacter l'Administrateur";
    this.notifie.creatednotification(this.profil.id, message, objet);

    //alert("Votre Article a été Supprimer");
    this.presentToast("Votre Article a été Supprimée");

    this.afs.collection('Articles').doc(this.name).delete();
    this.router.navigate(['/shop-edit']);
  }

  photosave() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      //console.log(imageData);
      let Pic = 'data:image/jpeg;base64,' + imageData;
      this.food.photo = Pic;
      const filePath = `Profile_photos/${this.profil.nom}.jpeg`;
      //alert(filePath);
      const ref = this.storage.ref(filePath);
      const task = ref.putString(Pic, 'data_url');
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            //this.imgPic = (url); // <-- do what ever you want with the url..
            //	this.updateProfilePhoto(url);
            this.food.photo = url;
          });
        })
      ).subscribe();

    }, (err) => {
      // Handle error this.imgPic = ref.getDownloadURL()
      console.log(err);
    });
  }
  send() {

    if (this.commentaire != "") {
      if (this.profil && this.profil != null) {
        this.afs.collection("CommentaireArticles").add({
          nom: this.profil.nom,
          photo: this.profil.photo,
          content: this.commentaire,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          idClient: this.profil.id,
          restaurant: this.name
        })
      }
      else {
        this.afs.collection("CommentaireArticles").add({
          nom: "",
          photo: "",
          content: this.commentaire,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          idClient: "",
          restaurant: this.name
        })

      }
    }
    else {
      //alert("Veuillez Ajouter le commentaire");
      this.presentToast("Veuillez Ajouter le commentaire");
    }
    this.commentaire = "";
  }
  save() {
    console.log(this.food);
    if (this.food.nom == '' || this.food.nom == '') {
     // alert("Veuillez renseigner le nom")
      this.presentToast("Veuillez renseigner le nom");
    } else {
      this.food.Boutique = this.restau;
      this.food.created = this.profil.id;
      this.afs.collection('Articles').add(this.food);
      this.edit = true;
      this.view = true;

    }
  }

  commande() {
    if (this.noConnect==false){
      this.presentToast("Vous n'êtes pas connecté(e)...");
      //this.connexion();
    }
    else {
if(this.profil.credit>this.food.prix+this.suivi){
    this.comman.nom = this.food.nom;
    this.comman.status = false;
    this.comman.photo = this.food.photo;
    this.comman.visible = false;
    this.comman.produit = this.name;
    this.comman.restau = this.food.Boutique;
    this.comman.idClient = this.profil.id;
    this.comman.type = "Articles";
    this.comman.prix = this.food.prix;
    if (this.vio) {
      this.afs.collection('Commande').add(this.comman);
      this.vio = false;
      this.coliscret();
    }

   
  }
  else{
    this.presentToast("Vous n'avez pas assez de credit");
  }
  }
  }
  coliscret() {
    let vero = true;
    this.transCollection = this.afs.collection('Commande', ref => ref.where('produit', '==', this.comman.produit)
      .where('idClient', '==', this.comman.idClient)
      .where('nom', '==', this.comman.nom)
      .orderBy('date')
    );
    this.ite = this.transCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.ite.subscribe(da => {
      if (da[0]) {
        console.log(da[0]);
        console.log(this.food.Boutique);
        this.itemDol = this.afs.collection('Boutique').doc(this.food.Boutique);
        this.item1 = this.itemDol.valueChanges();
        this.item1.subscribe(data => {
          console.log(data);
          this.course.depart = data.quartier;
          this.course.arrive = this.profil.quartier;
          this.course.villedepart = data.ville;
          this.course.villearrive = this.profil.ville;
          this.course.departlat = data.lat;
          this.course.departlong = data.long;
          this.course.arrivelat = this.profil.lat;
          this.course.arrivelong = this.profil.long;
          this.course.photo = this.food.photo;
          this.course.idClient = this.profil.id;
          this.course.idCommande = da[0].id;
          this.course.date = firebase.firestore.FieldValue.serverTimestamp();
          this.course.prix = Math.floor(250 * this.gps.calculateDistance(this.course.departlat, this.course.arrivelat, this.course.departlong, this.course.arrivelong));
          this.course.idConducteur = "";
          this.course.engin = "Moto";
          this.course.type = "Colis";
          this.course.visible = true;
          this.course.status = false;
          console.log(this.course);
          this.afs.collection('Transport').add(this.course);
          vero = false;
          this.presentToast("Votre Commande a bien été effectuée");
          this.router.navigate(["/tabs"]);

        })
      }

    });
  }
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: MenuRestoComponent,
      cssClass: 'custom-popover',
      translucent: true
    });
    return popover.present();
  }


  async connexion() {
    const popover = await this.popoverController.create({
      component: ConnexionMessageComponent,
      cssClass: 'custom-popover',
      translucent: true
    });
    return popover.present();
  }


  filterList(evt) {
    // this.foodList = await this.initializeItems();
    const searchTerm = evt.target.value;
    this.plati = this.plat;
    console.log(searchTerm);
    console.log(searchTerm.length);
    if (!searchTerm || 0 >= searchTerm.length) {
      console.log(searchTerm.length);
      this.plati = this.plat;
    } else {

      this.plati = this.plati.filter(currentFood => {
        if (currentFood.nom && searchTerm) {
          console.log(currentFood)
          return (currentFood.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentFood.style.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
