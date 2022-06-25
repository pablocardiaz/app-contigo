import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {

  rut: string= '';
  contrasena: string='';
  nuevaContrasena: string='';
  nuevaContrasena2: string='';


  constructor(
    private alertController: AlertController,
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

  ModificarContrasena() {
    this.api.ModificarContrasena(this.rut, this.contrasena, this.nuevaContrasena).subscribe((data: any) => {
      console.log(data)
      if (data.resultado  === 'CAMBIO_CONTRASEÑA_OK') {
        localStorage.setItem('SESSION', JSON.stringify(data.resultado ));
      } else {
        this.mostrarRespuesta("Datos ingresados");
        
      }
    })
  }

}
