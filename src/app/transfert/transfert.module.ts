import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfertPageRoutingModule } from './transfert-routing.module';

import { TransfertPage } from './transfert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfertPageRoutingModule
  ],
  declarations: [TransfertPage]
})
export class TransfertPageModule {}
