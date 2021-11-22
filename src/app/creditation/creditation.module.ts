import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditationPageRoutingModule } from './creditation-routing.module';

import { CreditationPage } from './creditation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditationPageRoutingModule
  ],
  declarations: [CreditationPage]
})
export class CreditationPageModule {}
