import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageListPage } from './voyage-list.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageListPageRoutingModule {}
