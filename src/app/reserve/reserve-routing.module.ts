import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservePage } from './reserve.page';

const routes: Routes = [
  {
    path: '',
    component: ReservePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservePageRoutingModule {}
