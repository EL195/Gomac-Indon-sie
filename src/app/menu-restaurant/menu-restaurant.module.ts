import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuRestaurantPageRoutingModule } from './menu-restaurant-routing.module';

import { MenuRestaurantPage } from './menu-restaurant.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MenuRestaurantPageRoutingModule
  ],
  declarations: [MenuRestaurantPage]
})
export class MenuRestaurantPageModule {}
