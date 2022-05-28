import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  private formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      terms: [, Validators.required]
    }, {
      Validators: this.verifyPasswords()
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
    return !(password?.value === confirmPassword?.value);
  }

  public verifyPasswords() {
    return (formGroup: FormGroup) => {
      const pwd = formGroup.get('password');
      const cpwd = formGroup.get('confirmPassword');
      if (pwd?.value === cpwd?.value)
        cpwd?.setErrors(null);
      else
        cpwd?.setErrors({ notSame: true });
    }
  }

}
