import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuRestaurantPage } from './menu-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: MenuRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRestaurantPageRoutingModule {}
