import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageAddPage } from './voyage-add.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageAddPageRoutingModule {}
