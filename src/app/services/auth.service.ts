import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Usuario } from '../models/usuario.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario!: Usuario;
  private url: string = `${environment.url}/auth`;

  constructor(private http: HttpClient, private auth: AngularFireAuth) { }

  public get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role ?? 'USER_ROLE';
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password })
      .pipe(
        tap((response: any) =>
          this.saveLocalData(response['token'], response['menu'])
        )
      );
  }

  public async signinWithGoogle() {
    const result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const obj = JSON.parse(JSON.stringify(result.credential));
    const idToken = obj['idToken'];
    return this.loginWithGoogleJWT(idToken);
  }

  private loginWithGoogleJWT(token: string): Observable<any> {
    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        tap((response: any) =>
          this.saveLocalData(response['token'], response['menu'])
        )
      );
  }

  public renewToken(): Observable<boolean> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      return this.http.get(`${this.url}/renew`, {
        headers: new HttpHeaders({
          'x-token': token
        })
      })
        .pipe(
          map((response: any) => {
            const { uid, name, email, image, role, google } = response['usuario']
            this.usuario = new Usuario(name, email, '', uid, role, image, google);
            this.saveLocalData(response['token'], response['menu']);
            return true;
          }),
          catchError(() => of(false))
        );
    }

    return of(false);
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('menu');
    localStorage.removeItem('accessToken');

    const user = await this.auth.currentUser;

    if (user)
      await this.auth.signOut();
  }

  private saveLocalData(token: string, menu: string): void {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

}
