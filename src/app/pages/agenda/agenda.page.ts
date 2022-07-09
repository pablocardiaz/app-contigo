import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';
import { HijosService } from 'src/app/services/hijos.service';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  tipoCita = '';
  tipoCitas = [];
  doctor = '';
  doctores = [];
  dia = '';
  tramos = [];
  hijos = [];
  hijo = '';
  tramo_seleccionado = '';

  constructor(
    private hijosService: HijosService,
    public alertController: AlertController,
    private agendaService: AgendaService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.agendaService.obtenerTipoCita().subscribe((tipoCita: any) => {
      console.log(tipoCita);
      this.tipoCitas = tipoCita.resultado;
    });
    const padre_id = JSON.parse(localStorage.getItem('SESSION'));
    this.hijosService.obtenerHijos(padre_id.padre_id).subscribe((hijos: any) => {
      console.log(hijos);
      this.hijos = hijos.resultado;
    });
  }
  //Especialidad medica

  tipoCitaChange(event) {

    this.agendaService.obtenerDoctores(this.tipoCita).subscribe((doctores: any) => {
      this.doctores = doctores.resultado;
    });
  }
  doctorChange(event) {
    if (this.dia) {
      this.getTramos();
    }
  }
  diaChange(event) {
    if (this.doctor) {
      this.getTramos();
    }
  }

  getTramos() {
    console.log('Horario de Doctores')
    const fecha = new Date(this.dia)
    this.agendaService.obtenerTramosDoctores(this.doctor, fecha.getDay()).subscribe((tramos: any) => {
      this.tramos = tramos.resultado;

  
      const mes = fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
      this.agendaService.obtenerTramosFechaDoctores(`${fecha.getFullYear()}-${mes}-${fecha.getDate()}`).subscribe((citasPrevias: any) => {
//        console.log(citasPrevias);
        this.tramos = this.tramos.filter((tramo) => {
          return !citasPrevias.resultado.find((cita) => {
            return +cita.horario_tramo_doctor_id === +tramo.horario_tramo_doctor_id
          })
        })
      });
    });
  }
  seleccionar_tramo(tramo_seleccionado) {
    this.tramo_seleccionado = tramo_seleccionado;
  }

  async mostrarRespuesta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  agendar_cita() {
    const fecha = new Date(this.dia)
    const mes = fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
    this.agendaService.agendarCita({
      hijo_id: this.hijo,
      fecha: `${fecha.getFullYear()}-${mes}-${fecha.getDate()}`,
      horario_tramo_doctor_id: this.tramo_seleccionado
    }).subscribe(() => {
      this.mostrarRespuesta("Hora medica agendada con exito"); 
      this.router.navigate(['home'], { replaceUrl: true });


    })
  }
}
