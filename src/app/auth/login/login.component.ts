import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private as: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls)
        .forEach(control => {
          if (control instanceof FormGroup)
            Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
          else
            control.markAsTouched();
        });
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.as.login(email, password)
      .subscribe({
        next: _ => this.router.navigate(['/']),
        error: e => Swal.fire('¡Algo salio mal!', e.error.message, 'error'),
        complete: () => console.info('Login completado'),
      });
  }

  public isInValid(input: string) {
    return this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched;
  }

}
