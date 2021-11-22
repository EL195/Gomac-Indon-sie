import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit {
  product : any =  {
    title: '',
    description:'',
    cat:'',
    price: 0,
    quantity:0,
    key:'',
    imgUrl: ''
  }; 
  constructor() { }

  ngOnInit() {
  }

}
