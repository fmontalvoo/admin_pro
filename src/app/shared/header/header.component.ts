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

  public submit(event: any) {
    event.preventDefault();
    let query: string = '';
    const data = event.target;
    for (let i = 0; i < data.elements.length; i++) {
      const element = data.elements[i];
      if (element.name === 'txtBusqueda')
        query = element.value;
    }
    console.warn('query: ', query);
  }

  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
