import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VilleAddPage } from './ville-add.page';

const routes: Routes = [
  {
    path: '',
    component: VilleAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VilleAddPageRoutingModule {}
