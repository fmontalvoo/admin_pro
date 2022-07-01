import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;

  public doctores: Array<Doctor> = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private ds: DoctorService,
    private bs: BusquedasService,
    private ims: ImageModalService,
  ) { }

  ngOnInit(): void {
    this.cargarDoctores();

    const sub = this.ims.imgChange
      .pipe(delay(500))
      .subscribe(() => this.cargarDoctores());

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private cargarDoctores(): void {
    this.cargando = true;
    const sub = this.ds.listarDoctores()
      .pipe(delay(500))
      .subscribe(response => {
        this.cargando = false;
        console.log(response);
        this.doctores = response;
      });
    this.subscriptions.push(sub);
  }

  public buscar(query: string) {
    this.cargando = true;
    if (query) {
      const sub = this.bs.buscar(query, 'doctores')
        .subscribe({
          next: resultados => {
            this.cargando = false;
            console.log(resultados);
            this.doctores = resultados;
          },
          error: e => console.error(e),
          complete: () => console.info('Busqueda completada')
        });
      this.subscriptions.push(sub);
    } else {
      this.cargarDoctores();
    }
  }

  public abrirModal(doctor: Doctor): void {
    this.ims.abrirModal(doctor.id!, 'doctores', doctor.image);
  }

  public borrar(doctor: Doctor): void {

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar el hospital: ${doctor.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = this.ds.eliminarDoctor(doctor.id!)
          .subscribe({
            next: () => {
              this.cargarDoctores();
              Swal.fire(
                '¡Eliminado!',
                `El hospital ${doctor.name} ha sido eliminado`,
                'success'
              );
            },
            error: e => console.error(e),
            complete: () => console.info('Operacion completada')
          });
        this.subscriptions.push(sub);
      }
    })
  }

}
