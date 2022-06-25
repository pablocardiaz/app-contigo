import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HijosService {

  rutaBase: string = 'https://desarrollos.cl/app-contigo/api/api.service.php';

  constructor(private http: HttpClient) { }

  obtenerHijos(padre_id) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_hijos', padre_id } })
  }

  datosHijos(rut_hijo1){
    return this.http.get (this.rutaBase,{ params: { nombreFuncion: "datos_hijos", rut_hijo1}});
  }

}
