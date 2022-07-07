import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';
import { FichaMedicaPage } from '../ficha-medica/ficha-medica.page';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit 
{
  datoshijos = [];
  ruthijos =[];
    constructor(private hijosService: HijosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.route.params.subscribe((params)=>
    {
      console.log('Datos Generales del Hij@')
     // console.log(params. hijo_id)
    
      this.hijosService.datosHijos(params. hijo_id).subscribe((response: any) => 
      {
        this.datoshijos = response.resultado[0];
       // console.log(this.datoshijos);
        this.ruthijos = params.hijo_id;
        //console.log(this.ruthijos);
      }); 
    })      
  }
  goProfile() {
    var navExtra:NavigationExtras ={
      queryParams:{
      ruthijos:JSON.stringify(this.ruthijos)}
    }

    
    this.router.navigate(['ficha-medica'], navExtra );


  }
}



