import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryProductAddPage } from './category-product-add.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryProductAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryProductAddPageRoutingModule {}
