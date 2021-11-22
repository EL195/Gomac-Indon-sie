import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateVoyagePage } from './validate-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateVoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateVoyagePageRoutingModule {}
