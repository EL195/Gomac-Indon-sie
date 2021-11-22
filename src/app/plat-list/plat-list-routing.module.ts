import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatListPage } from './plat-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlatListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatListPageRoutingModule {}
