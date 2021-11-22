import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenceAddPage } from './agence-add.page';

const routes: Routes = [
  {
    path: '',
    component: AgenceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenceAddPageRoutingModule {}
