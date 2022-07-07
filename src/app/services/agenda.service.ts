import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  rutaBase: string = 'https://desarrollos.cl/app-contigo/api/api.service.php';

  constructor(private http: HttpClient) { }

  obtenerTipoCita() {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_tipo_cita' } });
  }

  obtenerDoctores(tipo_cita) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_doctor_tipo_cita', tipo_cita } });
  }

  obtenerTramosDoctores(doctor_id, dia) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_doctor_tramo', doctor_id, dia } });
  }

}
