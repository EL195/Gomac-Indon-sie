import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformPageRoutingModule } from './platform-routing.module';

import { PlatformPage } from './platform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformPageRoutingModule
  ],
  declarations: [PlatformPage]
})
export class PlatformPageModule {}
