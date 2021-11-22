import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPlatPageRoutingModule } from './category-plat-routing.module';

import { CategoryPlatPage } from './category-plat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPlatPageRoutingModule
  ],
  declarations: [CategoryPlatPage]
})
export class CategoryPlatPageModule {}
