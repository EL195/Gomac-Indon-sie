import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloquePage } from './bloque.page';

const routes: Routes = [
  {
    path: '',
    component: BloquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloquePageRoutingModule {}
