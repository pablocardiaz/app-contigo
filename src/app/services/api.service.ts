import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'https://desarrollos.cl/app-contigo/api/api.service.php';

  constructor(private http: HttpClient) { }

  //login(usuario, contrasena) {
   // return this.http.get(this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario=' + usuario + "&contrasena=" + contrasena);
  //}

  login(rut, contrasena) {
    return this.http.post(this.rutaBase, { nombreFuncion: "Validacion_login", rut: rut, contrasenas: contrasena });
  }

  sendMail(email) {
    return this.http.post(this.rutaBase, { nombreFuncion: "Validacion_mail", email: email });
  }

  ModificarContrasena(rut, contrasena, nuevaContrasena) {
    return this.http.put(this.rutaBase, { nombreFuncion: "ModificarContrasena", rut: rut, contrasenas: contrasena, nuevaContrasenas: nuevaContrasena });
  }

  ModificarCorreo(email, nuevoEmail) {
    return this.http.put(this.rutaBase, { nombreFuncion: "ModificarCorreo",  email: email, nuevoEmail: nuevoEmail });
  }

  ModificarCelular(celular, nuevoCelular) {
    return this.http.put(this.rutaBase, { nombreFuncion: "ModificarCelular",  celular: celular, nuevoCelular: nuevoCelular });
  }

  ObtenerDatosPadres (rut_padre){
    return this.http.get(this.rutaBase,{ params:{ nombreFuncion: "OBTENER_DATOS_PADRES",rut_padre}})
  }

  
  


  
}
