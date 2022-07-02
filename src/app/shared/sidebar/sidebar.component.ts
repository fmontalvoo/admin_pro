import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario!: Usuario;

  constructor(private as: AuthService, public ss: SidebarService) {
    this.usuario = as.usuario;
  }


  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
