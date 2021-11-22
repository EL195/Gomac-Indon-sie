import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatPage } from './plat.page';

const routes: Routes = [
  {
    path: '',
    component: PlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatPageRoutingModule {}
