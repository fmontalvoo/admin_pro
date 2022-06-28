import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import Swal from 'sweetalert2';

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
    private bs: BusquedasService,
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

  public buscar(query: string): void {
    this.cargando = true;
    if (query) {
      const sub = this.bs.buscar(query, 'hospitales')
        .subscribe({
          next: resultados => {
            this.cargando = false;
            console.log(resultados);
            this.hospitales = resultados;
          },
          error: e => console.error(e),
          complete: () => console.info('Busqueda completada')
        });
      this.subscriptions.push(sub);
    } else {
      this.cargarHospitales();
    }
  }

  public abrirModal(hospital: Hospital): void {
    this.ims.abrirModal(hospital.id!, 'hospitales', hospital.image);
  }

  public async abrirAlert() {
    const { value: name } = await Swal.fire<string>({
      title: 'Registrar hospital',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Registrar',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingresa el nombre del hospital'
    })

    if (name) {
      this.hs.crearHospital(name)
        .subscribe(response => {
          console.info(response);
          // this.cargarHospitales();
          this.hospitales.push(response.hospital);
          Swal.fire('Guardado!', `Se registro al hospital: ${name}`, 'success');
        }
          , e => console.error(e)
        );
    }
  }

  public guardarHospital(hospital: Hospital): void {
    this.hs.actualizarHospital(hospital.id!, hospital.name)
      .subscribe(response => {
        console.info(response);
        Swal.fire('¡Actualizado!', 'Nombre de hospital actualizado', 'success');
      });
  }


  public borrar(hospital: Hospital): void {

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar el hospital: ${hospital.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = this.hs.eliminarHospital(hospital.id!)
          .subscribe({
            next: () => {
              this.cargarHospitales();
              Swal.fire(
                '¡Eliminado!',
                `El hospital ${hospital.name} ha sido eliminado`,
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
