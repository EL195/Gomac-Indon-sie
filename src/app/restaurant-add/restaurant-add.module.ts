import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantAddPageRoutingModule } from './restaurant-add-routing.module';

import { RestaurantAddPage } from './restaurant-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantAddPageRoutingModule
  ],
  declarations: [RestaurantAddPage]
})
export class RestaurantAddPageModule {}
