import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rut: string= '';
  contrasena: string='';

  constructor(private alertController: AlertController,
    private api: ApiService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }
  async mostrarRespuesta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
  login() {
    this.api.login(this.rut, this.contrasena).subscribe((data: any) => {
      console.log(data)
      if (data.resultado && data.resultado.status === 200) {
        localStorage.setItem('SESSION', JSON.stringify(data.resultado ));
        this.router.navigate(['home'], { replaceUrl: true });
      } else {
        this.mostrarRespuesta("Credenciales incorrectas");
      }
    })
  }

  navegar() {
    this.router.navigate(['contrasena']);
  }

}
