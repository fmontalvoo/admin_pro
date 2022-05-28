import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  private formSubmitted: boolean = false;
  private checkedPassword: boolean = false;

  constructor(private fb: FormBuilder, private us: UsuarioService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      terms: [, Validators.required]
    });
  }

  public onSubmit(): void {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls)
        .forEach(control => {
          if (control instanceof FormGroup)
            Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
          else
            control.markAsTouched();
        });
    }

    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (!this.checkedPassword) return;

    this.us.crearUsuarios(name, email, password)
      .subscribe({
        next: _ => Swal.fire('Cuenta creada', '', 'success'),
        error: e => Swal.fire('¡Algo salio mal!', e.error.message, 'error'),
        complete: () => console.info('Usuario creado'),
      });

  }

  public isInValid(input: string) {
    return this.registerForm.get(input)?.invalid && this.registerForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.registerForm.get(input)?.valid;
  }

  public termsAcepted(): boolean {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  public checkPassword(): boolean {
    const password = this.registerForm.get('password');
    const confirmPassword = this.registerForm.get('confirmPassword');
    this.checkedPassword = (password?.value === confirmPassword?.value)
    return !this.checkedPassword;
  }

}
