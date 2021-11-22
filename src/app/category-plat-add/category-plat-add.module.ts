import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPlatAddPageRoutingModule } from './category-plat-add-routing.module';

import { CategoryPlatAddPage } from './category-plat-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPlatAddPageRoutingModule
  ],
  declarations: [CategoryPlatAddPage]
})
export class CategoryPlatAddPageModule {}
