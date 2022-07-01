import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit, OnDestroy {

  public id: string = '';

  public hospitales: Hospital[] = [];
  public hospitalSelecionado!: Hospital;
  public doctor!: Doctor;
  public doctorForm = this.fb.group({
    name: ['', Validators.required],
    hospital: ['', Validators.required]
  });

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ds: DoctorService,
    private hs: HospitalService,
    private ims: ImageModalService,
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    const param = this.route.snapshot.paramMap.get('id')!;
    if (param != 'new') this.id = param;

    if (this.id) {
      this.cargarDoctor();

      const sub = this.ims.imgChange
        .pipe(delay(500))
        .subscribe(() => this.cargarDoctor());

      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private cargarDoctor(): void {
    const sub = this.ds.leerDoctor(this.id)
      .subscribe(response => {
        this.doctor = response;
        const id = this.doctor?.hospital?.id;
        this.doctorForm.setValue({
          name: this.doctor.name,
          hospital: id
        });
        this.hospitalSelecionado = this.hospitales.find(hospital => hospital.id === id)!;
      });
    this.subscriptions.push(sub);
  }

  public selectHospital(event: any): void {
    const id = (event.target as HTMLInputElement).value;
    this.hospitalSelecionado = this.hospitales.find(hospital => hospital.id === id)!;

    // this.doctorForm.get('hospital')?.valueChanges
    //   .subscribe(id => {
    //     console.log(id);
    //     this.hospitalSelecionado = this.hospitales.find(hospital => hospital.id === id)!;
    //   });
  }

  private cargarHospitales(): void {
    const sub = this.hs.listarHospitales()
      .subscribe(response => {
        this.hospitales = response;
      });
    this.subscriptions.push(sub);
  }

  public abrirModal(doctor: Doctor): void {
    this.ims.abrirModal(doctor.id!, 'doctores', doctor.image);
  }


  public onSubmit(): void {
    if (this.doctorForm.invalid) return;
    const { name, hospital } = this.doctorForm.value;
    if (this.id) {
      const sub = this.ds.actualizarDoctor(this.id, name, hospital)
        .subscribe(response => {
          console.log(response);
          Swal.fire('¡Guardado!', `Se guardo al doctor: ${name}`, 'success');
        });
      this.subscriptions.push(sub);
    } else {
      const sub = this.ds.crearDoctor(name, hospital)
        .subscribe(response => {
          console.log(response);
          Swal.fire('¡Actualizado!', 'Doctor actualizado', 'success');
        });
      this.subscriptions.push(sub);
    }
  }

}
