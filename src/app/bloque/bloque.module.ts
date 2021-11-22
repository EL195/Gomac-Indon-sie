import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloquePageRoutingModule } from './bloque-routing.module';

import { BloquePage } from './bloque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloquePageRoutingModule
  ],
  declarations: [BloquePage]
})
export class BloquePageModule {}
