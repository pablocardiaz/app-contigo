import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private agendaService: AgendaService
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
    console.log(event);

    this.agendaService.obtenerDoctores(this.tipoCita).subscribe((doctores: any) => {
      console.log(doctores);
      this.doctores = doctores.resultado;
    });
  }
  doctorChange(event) {
    console.log(event);
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
    console.log('TRAMO')
    const fecha = new Date(this.dia)
    this.agendaService.obtenerTramosDoctores(this.doctor, fecha.getDay()).subscribe((tramos: any) => {
      console.log(tramos);
      this.tramos = tramos.resultado;

      const mes = fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
      this.agendaService.obtenerTramosFechaDoctores(`${fecha.getFullYear()}-${mes}-${fecha.getDate()}`).subscribe((citasPrevias: any) => {
        console.log(citasPrevias);
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
  agendar_cita() {
    const fecha = new Date(this.dia)
    const mes = fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
    this.agendaService.agendarCita({
      hijo_id: this.hijo,
      fecha: `${fecha.getFullYear()}-${mes}-${fecha.getDate()}`,
      horario_tramo_doctor_id: this.tramo_seleccionado
    }).subscribe(() => {
    })
  }
}
