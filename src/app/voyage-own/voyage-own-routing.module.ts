import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageOwnPage } from './voyage-own.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageOwnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageOwnPageRoutingModule {}
