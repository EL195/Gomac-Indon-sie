import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetcodePageRoutingModule } from './resetcode-routing.module';

import { ResetcodePage } from './resetcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetcodePageRoutingModule
  ],
  declarations: [ResetcodePage]
})
export class ResetcodePageModule {}
