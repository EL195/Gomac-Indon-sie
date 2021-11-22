import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageAddPageRoutingModule } from './voyage-add-routing.module';

import { VoyageAddPage } from './voyage-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyageAddPageRoutingModule
  ],
  declarations: [VoyageAddPage]
})
export class VoyageAddPageModule {}
