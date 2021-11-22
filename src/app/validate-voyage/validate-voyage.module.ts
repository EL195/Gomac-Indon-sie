import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateVoyagePageRoutingModule } from './validate-voyage-routing.module';

import { ValidateVoyagePage } from './validate-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateVoyagePageRoutingModule
  ],
  declarations: [ValidateVoyagePage]
})
export class ValidateVoyagePageModule {}
