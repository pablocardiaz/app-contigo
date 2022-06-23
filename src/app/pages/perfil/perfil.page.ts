import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      console.log(params. hijo_id)
    })
  }

}
