import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';

import { AuthService } from './auth.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.url}/usuarios`;
  private _token = localStorage.getItem('accessToken');
  constructor(private http: HttpClient, private as: AuthService) { }

  public crearUsuario(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.url, { name, email, password })
      .pipe(
        tap((response: any) =>
          localStorage.setItem('accessToken', response['token'])
        )
      );
  }

  public get token() {
    return this._token!;
  }

  public leerUsuario(uid: string): Observable<Usuario> {
    return this.http.get(`${this.url}/${uid}`, {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    })
      .pipe(
        map((response: any) => {
          const { uid, name, email, image, role, google } = response['usuario'];
          return new Usuario(name, email, '', uid, role, image, google);
        })
      );
  }

  public actualizarUsuario(uid: string, name: string, email: string): Observable<Usuario> {
    return this.http.put(`${this.url}/${uid}`, { name, email }, {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    })
      .pipe(
        tap((response: any) => {
          const { name, email } = response['usuario'];
          this.as.usuario.name = name;
          this.as.usuario.email = email;
        })
      );

  }
}
