import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VoyageListPageRoutingModule } from './voyage-list-routing.module';
import { VoyageListPage } from './voyage-list.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ComponentsModule,
    VoyageListPageRoutingModule
  ],
  declarations: [VoyageListPage]
})
export class VoyageListPageModule {}
