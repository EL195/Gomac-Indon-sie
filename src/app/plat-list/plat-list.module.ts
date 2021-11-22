import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatListPageRoutingModule } from './plat-list-routing.module';

import { PlatListPage } from './plat-list.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PlatListPageRoutingModule
  ],
  declarations: [PlatListPage]
})
export class PlatListPageModule {}
