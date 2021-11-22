import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestionPage } from './suggestion.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionPageRoutingModule {}
