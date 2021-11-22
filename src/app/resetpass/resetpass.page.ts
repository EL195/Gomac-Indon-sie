import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  username: string = '';
  image: number;
  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, public loadingController: LoadingController,
    public alertController: AlertController) {
  
  }
  
    ngOnInit() {
    }
  
    async openLoader() {
      const loading = await this.loadingController.create({
        message: 'Veuiller patienter ...',
        duration: 2000
      });
      await loading.present();
    }
    async closeLoading() {
      return await this.loadingController.dismiss();
    }
  
    recover() {
      this.fireauth.auth.sendPasswordResetEmail(this.email)
        .then(data => {
          console.log(data);
          this.presentToast('Instructions envoyées', false, 'bottom', 1000);
          this.router.navigateByUrl('/login');
        })
        .catch(err => {
          console.log(` failed ${err}`);
          this.error = err.message;
        });
    }
  
    async presentToast(message, show_button, position, duration) {
      const toast = await this.toastController.create({
        message: message,
        position: position,
        duration: duration
      });
      toast.present();
    }
  
  }
  