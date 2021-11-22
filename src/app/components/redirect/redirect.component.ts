import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {

  constructor(
    public router: Router,
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  oui(){
    window.open("http://afitra.cm/", "_self"); 
    this. non();
  }



  non()
   {
    this.popover.dismiss();
   }

}
