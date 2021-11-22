import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryProductAddPageRoutingModule } from './category-product-add-routing.module';

import { CategoryProductAddPage } from './category-product-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryProductAddPageRoutingModule
  ],
  declarations: [CategoryProductAddPage]
})
export class CategoryProductAddPageModule {}
