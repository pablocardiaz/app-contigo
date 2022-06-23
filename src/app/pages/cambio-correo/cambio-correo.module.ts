import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioCorreoPageRoutingModule } from './cambio-correo-routing.module';

import { CambioCorreoPage } from './cambio-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioCorreoPageRoutingModule
  ],
  declarations: [CambioCorreoPage]
})
export class CambioCorreoPageModule {}
