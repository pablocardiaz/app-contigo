import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'https://desarrollos.cl/app-contigo/api/api.service.php';

  constructor(private http: HttpClient) { }
/*acá tambien necesito entender y que me guie como hacerlo ya que esto es un codigo reciclado de otro trabajo de universidad en la cual no me toco hacer*/
  //login(usuario, contrasena) {
   // return this.http.get(this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario=' + usuario + "&contrasena=" + contrasena);
  //}

  login(rut, contrasena) {
    return this.http.post(this.rutaBase, { nombreFuncion: "Validacion_login", rut: rut, contrasenas: contrasena });
  }

  modificarContrasena(usuario, contrasena) {
    return this.http.put(this.rutaBase, { nombreFuncion: "UsuarioModificarContrasena", parametros: { usuario: usuario, contrasena: contrasena } });
  }

  
  


  
}
