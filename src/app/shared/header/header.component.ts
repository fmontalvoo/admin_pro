import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private as: AuthService, private router: Router) {
    this.usuario = as.usuario;
  }

  public submit(event: any) {
    event.preventDefault();
    const data = event.target;
    for (let i = 0; i < data.elements.length; i++) {
      const element = data.elements[i];
      if (element.name === 'txtBusqueda') {
        const query = element.value;
        if (!!query)
          this.router.navigate(['/dashboard', 'search', query]);
      }
    }
  }

  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
