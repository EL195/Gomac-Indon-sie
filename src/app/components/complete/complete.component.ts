import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {

  constructor(
    public router: Router,
    private popover:PopoverController
  ) { }

  ngOnInit() {}

  
  complete(){
    this.router.navigate(['/tabs/tab3']);
    this. visit();
  }



  visit()
   {
    this.popover.dismiss();
   }

}
