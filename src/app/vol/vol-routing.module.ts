import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolPage } from './vol.page';

const routes: Routes = [
  {
    path: '',
    component: VolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolPageRoutingModule {}
