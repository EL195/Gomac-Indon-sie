import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPlatListPage } from './category-plat-list.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPlatListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPlatListPageRoutingModule {}
