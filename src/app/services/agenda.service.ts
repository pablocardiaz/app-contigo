import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  rutaBase: string = 'https://desarrollos.cl/app-contigo/api/api.service.php';
  //rutaBase: string = 'http://localhost/contigo/api/api.service.php';


  constructor(private http: HttpClient) { }

  obtenerTipoCita() {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_tipo_cita' } });
  }

  obtenerDoctores(tipo_cita) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'obtener_doctor_tipo_cita', tipo_cita } });
  }

  obtenerTramosDoctores(doctor_id, dia) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'GET_DOCTOR_TRAMOS', doctor_id, dia } });
  }

  obtenerTramosFechaDoctores(fecha) {
    return this.http.get(this.rutaBase, { params: { nombreFuncion: 'SP_OBTENER_DOCTOR_FECHA_TRAMO', fecha } });
  }

  agendarCita(body) {
    return this.http.post(this.rutaBase, { nombreFuncion: 'agendar_cita', ...body });
  }
}
