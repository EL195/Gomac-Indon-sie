import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopProductPage } from './shop-product.page';

const routes: Routes = [
  {
    path: '',
    component: ShopProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductPageRoutingModule {}
