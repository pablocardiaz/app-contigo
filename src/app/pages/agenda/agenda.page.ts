import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';
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
  constructor(
    public alertController: AlertController,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.agendaService.obtenerTipoCita().subscribe((tipoCita: any) => {
      console.log(tipoCita);
      this.tipoCitas = tipoCita.resultado;
    });
    this.agendaService.obtenerTramosDoctores(2, 0).subscribe((tipoCita) => {
      console.log(tipoCita);
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
    this.agendaService.obtenerTramosDoctores(this.doctor, new Date(this.dia).getDay()).subscribe((tramos: any) => {
      console.log(tramos);
      this.tramos = tramos.resultado;
    });
  }



}
