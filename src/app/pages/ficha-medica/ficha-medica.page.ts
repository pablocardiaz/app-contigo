import { Component, OnInit } from '@angular/core';
import { PerfilPage } from '../perfil/perfil.page';
import { ActivatedRoute } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements OnInit {

  ruthijos =[];
  data =[];
  dataresult =[];

  constructor(
    private hijosService: HijosService,
    private activatedRouted: ActivatedRoute) {

     }

  ngOnInit() {
      console.log("Informacion de las fichas Medicas")
      this.activatedRouted.queryParams.subscribe (parametro =>{
        if (parametro.ruthijos)
        {
        this.data =JSON.parse(parametro.ruthijos);
        }
      })
    
    this.hijosService.fichaMedicaHijos(this.data).subscribe((response: any) => 
      
    {
      console.log(response);
      this.dataresult = response.resultado;

    });

  }
  

}
