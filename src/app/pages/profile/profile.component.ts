import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Subscription } from 'rxjs/internal/Subscription';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profileForm!: FormGroup;
  private usuario!: Usuario;
  public imagen!: File;
  private userSubscription: Subscription;
  public imgTemp: string = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private us: UsuarioService,
    private ufs: UploadFilesService) {
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    const uid = this.route.snapshot.paramMap.get('id');
    // this.route.queryParams.subscribe(params => {
    //   const uid = params['id'];
    // });

    const sub = this.us.leerUsuario(uid!)
      .subscribe({
        next: usuario => {
          this.usuario = usuario;
          this.profileForm.setValue({
            name: usuario.name,
            email: usuario.email
          });
        },
        error: e => console.error(e),
        complete: () => console.log('Lectura de usuario completa')
      });
    this.userSubscription.add(sub);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.profileForm.invalid) {
      return Object.values(this.profileForm.controls)
        .forEach(control => {
          if (control instanceof FormGroup)
            Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
          else
            control.markAsTouched();
        });
    }

    const name = this.profileForm.controls['name'].value;
    const email = this.profileForm.controls['email'].value;

    console.log(name, email);

    const sub = this.us.actualizarUsuario(this.usuario.uid!, name, email)
      .subscribe({
        next: usuario => console.log(usuario),
        error: e => Swal.fire('¡Algo salio mal!', e.error.message, 'error'),
        complete: () => Swal.fire('¡Actualizado!', 'El usuario ha sido actualizado', 'success')
      });
    this.userSubscription.add(sub);
  }

  public cargarImagen(event: Event): void {
    // const file = event.target?.files.item(0);
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) {
      this.imgTemp = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgTemp = reader.result?.toString()!;
    }

    this.imagen = file;
  }

  public subirImagen(): void {
    this.ufs.actualizarImagen(this.imagen, 'usuarios', this.usuario.uid!)
      .then(data => {
        this.usuario.image = data.fileName;
        Swal.fire('¡Actualizado!', 'La foto de perfil fue actualizada', 'success');
      }
      )
      .catch(e =>
        Swal.fire('¡Algo salio mal!', e.error.message, 'error')
      );
  }

  public isInValid(input: string) {
    return this.profileForm.get(input)?.invalid && this.profileForm.get(input)?.touched;
  }

  public get image(): string {
    if (this.usuario)
      return this.usuario.imageUrl;
    return 'assets/images/no-img.jpg';
  }

  public get google(): boolean {
    if (this.usuario)
      return this.usuario.google!;
    return false;
  }


}
