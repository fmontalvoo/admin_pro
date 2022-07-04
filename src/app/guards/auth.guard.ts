import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private as: AuthService, private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.as.renewToken()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated)
            this.router.navigate(['/login']);
        })
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.as.renewToken()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated)
            this.router.navigate(['/login']);
        })
      );
  }

}
