import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit
{

  rut: string= '';
  contrasena: string='';
  padre_id: string='';

  datos_padre = [];

  constructor(private apiService: ApiService) 
  {  
    
    let session: any = localStorage.getItem('SESSION');
    this.padre_id = JSON.parse(session).padre_id;
  // this.sesion= JSON.parse(localStorage.getItem('SESSION')).padre_id;
        console.log(this.padre_id);
  }

  ngOnInit() 
  {

    this.apiService.ObtenerDatosPadres(this.padre_id).subscribe((response: any) => 
    
    {
      console.log(response);
      this.datos_padre = response.resultado[0];
  
    });
  }
}
