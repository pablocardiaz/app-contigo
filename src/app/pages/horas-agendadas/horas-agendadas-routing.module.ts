import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorasAgendadasPage } from './horas-agendadas.page';

const routes: Routes = [
  {
    path: '',
    component: HorasAgendadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorasAgendadasPageRoutingModule {}
