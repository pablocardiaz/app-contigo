import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email: string= '';

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

  sendMail() {
    this.api.sendMail(this.email).subscribe((data: any) => {
      console.log(data)
      if (data.resultado && data.resultado.status === 200) {
        localStorage.setItem('SESSION', JSON.stringify(data.resultado ));
        this.router.navigate(['login'], { replaceUrl: true });
      } else {
        this.mostrarRespuesta("Correo electrónico no existe en la base de datos");
      }
    })
  }
  navegar() {
    this.router.navigate(['email']);
  }

}
