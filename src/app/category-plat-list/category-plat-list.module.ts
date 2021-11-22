import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPlatListPageRoutingModule } from './category-plat-list-routing.module';

import { CategoryPlatListPage } from './category-plat-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPlatListPageRoutingModule
  ],
  declarations: [CategoryPlatListPage]
})
export class CategoryPlatListPageModule {}
