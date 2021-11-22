import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageEditPage } from './voyage-edit.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageEditPageRoutingModule {}
