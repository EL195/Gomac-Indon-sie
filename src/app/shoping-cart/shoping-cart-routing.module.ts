import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopingCartPage } from './shoping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ShopingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopingCartPageRoutingModule {}
