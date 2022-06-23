import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioCelularPage } from './cambio-celular.page';

const routes: Routes = [
  {
    path: '',
    component: CambioCelularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioCelularPageRoutingModule {}
