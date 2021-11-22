import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-connexion-message',
  templateUrl: './connexion-message.component.html',
  styleUrls: ['./connexion-message.component.scss'],
})
export class ConnexionMessageComponent implements OnInit {

  constructor(
    public router: Router,
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  connect(){
    this.router.navigate(['/login']);
    this. visit();
  }



  visit()
   {
    this.popover.dismiss();
   }

}
