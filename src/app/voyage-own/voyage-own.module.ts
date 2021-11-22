import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageOwnPageRoutingModule } from './voyage-own-routing.module';

import { VoyageOwnPage } from './voyage-own.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyageOwnPageRoutingModule
  ],
  declarations: [VoyageOwnPage]
})
export class VoyageOwnPageModule {}
