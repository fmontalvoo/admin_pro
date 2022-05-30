import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menu: any[];

  constructor(private as: AuthService, private ss: SidebarService) {
    this.menu = this.ss.menu;
  }


  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
