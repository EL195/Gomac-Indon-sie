import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditationPage } from './creditation.page';

const routes: Routes = [
  {
    path: '',
    component: CreditationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditationPageRoutingModule {}
