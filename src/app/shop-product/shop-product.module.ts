import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProductPageRoutingModule } from './shop-product-routing.module';

import { ShopProductPage } from './shop-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProductPageRoutingModule
  ],
  declarations: [ShopProductPage]
})
export class ShopProductPageModule {}
