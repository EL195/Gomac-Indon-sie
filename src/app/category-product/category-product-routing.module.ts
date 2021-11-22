import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryProductPage } from './category-product.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryProductPageRoutingModule {}
