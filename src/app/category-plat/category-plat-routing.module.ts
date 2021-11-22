import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPlatPage } from './category-plat.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPlatPageRoutingModule {}
