import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorasAgendadasPageRoutingModule } from './horas-agendadas-routing.module';

import { HorasAgendadasPage } from './horas-agendadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorasAgendadasPageRoutingModule
  ],
  declarations: [HorasAgendadasPage]
})
export class HorasAgendadasPageModule {}
