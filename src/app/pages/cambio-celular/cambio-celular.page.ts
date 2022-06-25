import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-celular',
  templateUrl: './cambio-celular.page.html',
  styleUrls: ['./cambio-celular.page.scss'],
})
export class CambioCelularPage implements OnInit {

  celular: string= '';
  nuevoCelular: string= '';

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
  
    ModificarCelular() {
      this.api.ModificarCelular(this.celular, this.nuevoCelular).subscribe((data: any) => {
        console.log(data)
        if (data.resultado  === 'CAMBIO_CELULAR_OK') {
          localStorage.setItem('SESSION', JSON.stringify(data.resultado ));
        } else {
          this.mostrarRespuesta("Credenciales incorrectas");
        }
      })
    }

}
