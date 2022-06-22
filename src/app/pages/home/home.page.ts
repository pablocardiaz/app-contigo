import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HijosService } from 'src/app/services/hijos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  hijos = [];
  constructor(private hijosService: HijosService,
    private router: Router) { }

  ngOnInit() {
    console.log('INIT')
    let session: any = localStorage.getItem('SESSION');
    if (!session) {
      this.router.navigate(['login'], { replaceUrl: true });
    }
    session = JSON.parse(session);
    this.hijosService.obtenerHijos(session.padre_id).subscribe((response: any) => {
      console.log(response);
      this.hijos = response.resultado;
    });
  }
  ngOnDestroy() {
    this.hijos = [];
  }

  goProfile(hijo) {
    this.router.navigate(['perfil', hijo.rut], { replaceUrl: true });
  }
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
