import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[] = [];
  public doctores: Doctor[] = [];
  public hospitales: Hospital[] = [];

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(private route: ActivatedRoute, private bs: BusquedasService) { }

  ngOnInit(): void {
    const sub = this.route.params.subscribe(({ query }) => {
      console.log(query);
      this.busqueda(query);
    });
    this.subscriptions.push(sub);
  }

  private busqueda(query: string): void {
    const sub = this.bs.busquedaGeneral(query)
      .subscribe((result: any) => {
        console.log(result);
        this.usuarios = result.usuarios;
        this.doctores = result.doctores;
        this.hospitales = result.hospitales;
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
