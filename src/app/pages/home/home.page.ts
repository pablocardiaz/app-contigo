import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  padre_id: string='';


  hijos = [];
  datos_padre = [];

  constructor(private hijosService: HijosService,
    private router: Router, private apiService: ApiService) {
      
    
    let session: any = localStorage.getItem('SESSION');
    this.padre_id = JSON.parse(session).padre_id;
  // this.sesion= JSON.parse(localStorage.getItem('SESSION')).padre_id;
        console.log(this.padre_id);
     }

  ngOnInit() {
    console.log('Detalle de Hij@s')
    let session: any = localStorage.getItem('SESSION');
    if (!session) {
      this.router.navigate(['login'], { replaceUrl: true });
    }
    session = JSON.parse(session);
    this.hijosService.obtenerHijos(session.padre_id).subscribe((response: any) => {
      console.log(response);
      this.hijos = response.resultado;
    });

    this.apiService.ObtenerDatosPadres(this.padre_id).subscribe((response: any) => 
    
    {
      console.log(response);
      this.datos_padre = response.resultado[0];
  
    });
  }
  ngOnDestroy() {
    this.hijos = [];
  }

  goProfile(hijo) {
    this.router.navigate(['perfil', hijo.rut], { replaceUrl: true });
  }
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
