import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersProductsPage } from './orders-products.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersProductsPageRoutingModule {}
