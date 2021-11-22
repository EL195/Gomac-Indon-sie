import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatPageRoutingModule } from './plat-routing.module';

import { PlatPage } from './plat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatPageRoutingModule
  ],
  declarations: [PlatPage]
})
export class PlatPageModule {}
