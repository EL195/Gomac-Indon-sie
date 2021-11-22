import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VilleAddPageRoutingModule } from './ville-add-routing.module';

import { VilleAddPage } from './ville-add.page';
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VilleAddPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VilleAddPage]
})
export class VilleAddPageModule {}
