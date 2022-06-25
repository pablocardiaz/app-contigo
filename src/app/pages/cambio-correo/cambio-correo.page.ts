import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-correo',
  templateUrl: './cambio-correo.page.html',
  styleUrls: ['./cambio-correo.page.scss'],
})
export class CambioCorreoPage implements OnInit {

  email: string= '';
  nuevoEmail: string= '';

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
  
    ModificarCorreo() {
      this.api.ModificarCorreo(this.email, this.nuevoEmail).subscribe((data: any) => {
        console.log(data)
        if (data.resultado  === 'CAMBIO_CORREO_OK') {
          localStorage.setItem('SESSION', JSON.stringify(data.resultado ));
        } else {
          this.mostrarRespuesta("Credenciales incorrectas");
        }
      })
    }
  
  }
