import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillesPage } from './villes.page';

const routes: Routes = [
  {
    path: '',
    component: VillesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VillesPageRoutingModule {}
