import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private authSubscription: Subscription;


  constructor(private router: Router, private fb: FormBuilder, private as: AuthService) {
    const email = localStorage.getItem('email');
    this.loginForm = this.fb.group({
      email: [email || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [!!email]
    });
    this.authSubscription = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
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
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    const sub = this.as.login(email, password)
      .subscribe({
        next: _ => {
          if (rememberMe)
            localStorage.setItem('email', email);
          else
            localStorage.removeItem('email');

          this.router.navigate(['/'])
        },
        error: e => Swal.fire('¡Algo salio mal!', e.error.message, 'error'),
        complete: () => console.info('Login completado'),
      });
    this.authSubscription.add(sub);
  }

  public onLoginWithGoogle(): void {
    this.as.signinWithGoogle()
      .then(fun => {
        const sub = fun.subscribe({
          next: _ => this.router.navigate(['/']),
          error: e => Swal.fire('¡Algo salio mal!', e.error.message, 'error'),
          complete: () => console.info('Login completado'),
        });
        this.authSubscription.add(sub);
      });
  }

  public isInValid(input: string) {
    return this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched;
  }

}
