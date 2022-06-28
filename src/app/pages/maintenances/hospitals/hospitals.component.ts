import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;

  public hospitales: Array<Hospital> = new Array();

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private hs: HospitalService,
    private ims: ImageModalService,
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    const sub = this.ims.imgChange
      .pipe(delay(500))
      .subscribe(() => this.cargarHospitales());
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private cargarHospitales(): void {
    this.cargando = true;
    const sub = this.hs.listarHospitales()
      .pipe(delay(500))
      .subscribe(response => {
        this.cargando = false;
        this.hospitales = response;
      });
    this.subscriptions.push(sub);
  }

  public abrirModal(hospital: Hospital): void {
    this.ims.abrirModal(hospital.id!, 'hospitales', hospital.image);
  }

  public buscar(query: string): void {
    this.cargando = true;
  }


}
