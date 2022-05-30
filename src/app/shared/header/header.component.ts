import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private as: AuthService) { }

  public logout(): void {
    location.href = '/';
    this.as.logout();
  }

}
