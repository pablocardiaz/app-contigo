import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioCelularPageRoutingModule } from './cambio-celular-routing.module';

import { CambioCelularPage } from './cambio-celular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioCelularPageRoutingModule
  ],
  declarations: [CambioCelularPage]
})
export class CambioCelularPageModule {}
