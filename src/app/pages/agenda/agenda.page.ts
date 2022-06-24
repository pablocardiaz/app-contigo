import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  constructor(
    public alertController: AlertController

  ) { }

  ngOnInit() {
  }
  //Especialidad medica
  especialidadMedica() {
    this.alertController.create({
      header: 'Lista de especialidades',
      message: 'Selecciona una especialidad',
      inputs: [
        {
          type: 'radio',
          label: 'Extra Small',
          value: 'xs'
        },
        {
          type: 'radio',
          label: 'Small',
          value: 's'
        },
        {
          type: 'radio',
          label: 'Medium',
          value: 'm'
        },
        {
          type: 'radio',
          label: 'Large',
          value: 'l'
        },
        {
          type: 'radio',
          label: 'Extra Large',
          value: 'xl'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Aceptar',
          handler: (data: any) => {
            console.log('Selecciono la siguiente especialidad: ', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

//medico
nombresMedicos(): void {
  this.alertController.create({
    header: 'Lista de Medicos',
    message: 'Seleccione un Medico',
    inputs: [
      {
        type: 'radio',
        label: 'Extra Small',
        value: 'xs'
      },
      {
        type: 'radio',
        label: 'Small',
        value: 's'
      }
      
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: (data: any) => {
          console.log('Cancelar', data);
        }
      },
      {
        text: 'Aceptar',
        handler: (data: any) => {
          console.log('Selecciono a: ', data);
        }
      }
    ]
  }).then(res => {
    res.present();
  });
}




}
