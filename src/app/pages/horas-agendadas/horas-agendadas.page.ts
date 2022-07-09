import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';
import { ApiService } from 'src/app/services/api.service';
import { AgendaService } from 'src/app/services/agenda.service';



@Component({
  selector: 'app-horas-agendadas',
  templateUrl: './horas-agendadas.page.html',
  styleUrls: ['./horas-agendadas.page.scss'],
})
export class HorasAgendadasPage implements OnInit 
{

  padre_id: string='';
  padre_rut_id: string='';
  padre_rutinfo = [];
  datos_padre = [];

  constructor(
    private hijosService: HijosService,
    private router: Router, 
    private apiService: ApiService,
    private agendaService:AgendaService) {
      
    
    let session: any = localStorage.getItem('SESSION');
    this.padre_id = JSON.parse(session).padre_id;
    this.padre_rut_id = this.padre_id;
     }
  

  ngOnInit() {

    this.agendaService.obtenerCitasAgendadas(this.padre_rut_id).subscribe((data: any) => {
     // console.log(padre_rut_id);
      this.padre_rutinfo = data.resultado;
    });

    //this.agendaService.obtenerCitasAgendadas(session.padre_rut_id).subscribe((response: any) => {
    //});
  }

}

