import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageDetailPage } from './voyage-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageDetailPageRoutingModule {}
