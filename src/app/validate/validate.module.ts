import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatePageRoutingModule } from './validate-routing.module';

import { ValidatePage } from './validate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatePageRoutingModule
  ],
  declarations: [ValidatePage]
})
export class ValidatePageModule {}
