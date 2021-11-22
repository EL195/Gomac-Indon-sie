import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfertPage } from './transfert.page';

const routes: Routes = [
  {
    path: '',
    component: TransfertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfertPageRoutingModule {}
