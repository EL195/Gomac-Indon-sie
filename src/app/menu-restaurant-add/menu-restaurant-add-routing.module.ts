import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuRestaurantAddPage } from './menu-restaurant-add.page';

const routes: Routes = [
  {
    path: '',
    component: MenuRestaurantAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRestaurantAddPageRoutingModule {}
