import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil/:hijo_id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'edit-usuario',
    loadChildren: () => import('./pages/edit-usuario/edit-usuario.module').then( m => m.EditUsuarioPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'cambio-correo',
    loadChildren: () => import('./pages/cambio-correo/cambio-correo.module').then( m => m.CambioCorreoPageModule)
  },
  {
    path: 'cambio-celular',
    loadChildren: () => import('./pages/cambio-celular/cambio-celular.module').then( m => m.CambioCelularPageModule)
  },
  {
    path: 'cambio-contrasena',
    loadChildren: () => import('./pages/cambio-contrasena/cambio-contrasena.module').then( m => m.CambioContrasenaPageModule)
  },
  {
    path: 'ficha-medica',
    loadChildren: () => import('./pages/ficha-medica/ficha-medica.module').then( m => m.FichaMedicaPageModule)
  },  {
    path: 'horas-agendadas',
    loadChildren: () => import('./pages/horas-agendadas/horas-agendadas.module').then( m => m.HorasAgendadasPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
