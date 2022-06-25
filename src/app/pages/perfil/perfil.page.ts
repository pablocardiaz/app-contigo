import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit 
{
  datoshijos = [];
    constructor(private hijosService: HijosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe((params)=>
    {
      console.log('holamundo')
      console.log(params. hijo_id)
    
    
      this.hijosService.datosHijos(params. hijo_id).subscribe((response: any) => 
      {
      
        this.datoshijos = response.resultado[0];
        console.log(this.datoshijos);
      }); 
    })     
  }
}



