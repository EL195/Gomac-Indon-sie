import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantAddPage } from './restaurant-add.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantAddPageRoutingModule {}
