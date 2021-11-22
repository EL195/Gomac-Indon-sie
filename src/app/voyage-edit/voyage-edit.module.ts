import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageEditPageRoutingModule } from './voyage-edit-routing.module';

import { VoyageEditPage } from './voyage-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyageEditPageRoutingModule
  ],
  declarations: [VoyageEditPage]
})
export class VoyageEditPageModule {}
