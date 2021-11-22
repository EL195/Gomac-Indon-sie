import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryProductPageRoutingModule } from './category-product-routing.module';

import { CategoryProductPage } from './category-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryProductPageRoutingModule
  ],
  declarations: [CategoryProductPage]
})
export class CategoryProductPageModule {}
