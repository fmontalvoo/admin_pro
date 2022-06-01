import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profileForm!: FormGroup;
  private usuario!: Usuario;
  private userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private us: UsuarioService) {
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

    this.us.actualizarUsuario(this.usuario.uid!, name, email)
      .subscribe(response => {
        console.log(response);
      });
  }

  public isInValid(input: string) {
    return this.profileForm.get(input)?.invalid && this.profileForm.get(input)?.touched;
  }


}
