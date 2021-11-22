import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPlatAddPage } from './category-plat-add.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPlatAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPlatAddPageRoutingModule {}
