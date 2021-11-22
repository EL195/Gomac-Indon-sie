import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuRestaurantAddPageRoutingModule } from './menu-restaurant-add-routing.module';

import { MenuRestaurantAddPage } from './menu-restaurant-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRestaurantAddPageRoutingModule
  ],
  declarations: [MenuRestaurantAddPage]
})
export class MenuRestaurantAddPageModule {}
