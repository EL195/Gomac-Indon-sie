import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColisPage } from './colis.page';

const routes: Routes = [
  {
    path: '',
    component: ColisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColisPageRoutingModule {}
