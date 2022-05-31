import { Component } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario!: Usuario;

  constructor(private as: AuthService) {
    this.usuario = as.usuario;
  }

  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
