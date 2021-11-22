import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetcodePage } from './resetcode.page';

const routes: Routes = [
  {
    path: '',
    component: ResetcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetcodePageRoutingModule {}
