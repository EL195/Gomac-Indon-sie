import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenceAddPageRoutingModule } from './agence-add-routing.module';

import { AgenceAddPage } from './agence-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenceAddPageRoutingModule
  ],
  declarations: [AgenceAddPage]
})
export class AgenceAddPageModule {}
