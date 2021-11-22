import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.page.html',
  styleUrls: ['./bloque.page.scss'],
})
export class BloquePage implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }


  contact(){ 
    this.router.navigate(['/suggestion']);
  }
}
