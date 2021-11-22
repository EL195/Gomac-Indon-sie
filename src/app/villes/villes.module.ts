import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VillesPageRoutingModule } from './villes-routing.module';

import { VillesPage } from './villes.page';
import { MenuvComponent } from '../compoents/menuv/menuv.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VillesPageRoutingModule
  ],
  declarations: [VillesPage]
})
export class VillesPageModule {}
