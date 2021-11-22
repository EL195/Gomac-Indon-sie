import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageDetailPageRoutingModule } from './voyage-detail-routing.module';

import { VoyageDetailPage } from './voyage-detail.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VoyageDetailPageRoutingModule
  ],
  declarations: [VoyageDetailPage]
})
export class VoyageDetailPageModule {}
