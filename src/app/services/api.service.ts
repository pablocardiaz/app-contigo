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

  sendMail(email) {
    return this.http.post(this.rutaBase, { nombreFuncion: "Validacion_mail", email: email });
  }

  modificarContrasena(rut, contrasena, nuevaContrasena) {
    return this.http.put(this.rutaBase, { nombreFuncion: "ModificarContrasena", rut: rut, contrasenas: contrasena, nuevaContrasenas: nuevaContrasena });
  }

  modificarCorreo(email) {
    return this.http.put(this.rutaBase, { nombreFuncion: "ModificarCorreo", parametros: { email: email } });
  }

  

  
  


  
}
