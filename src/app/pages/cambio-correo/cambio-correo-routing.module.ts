import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioCorreoPage } from './cambio-correo.page';

const routes: Routes = [
  {
    path: '',
    component: CambioCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioCorreoPageRoutingModule {}
