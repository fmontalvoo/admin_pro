import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';

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

  public leerUsuario(uid: string): Observable<Usuario> {
    return this.http.get(`${this.url}/${uid}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const { uid, name, email, image, role, google } = response['usuario'];
          return new Usuario(name, email, '', uid, role, image, google);
        })
      );
  }

  public actualizarUsuario(uid: string, name: string, email: string): Observable<Usuario> {
    return this.http.put(`${this.url}/${uid}`, { name, email }, { headers: this.headers })
      .pipe(
        tap((response: any) => {
          const { name, email } = response['usuario'];
          this.as.usuario.name = name;
          this.as.usuario.email = email;
        })
      );
  }

  public eliminarUsuario(uid: string) {
    return this.http.delete(`${this.url}/${uid}`, { headers: this.headers });
  }

  public listarUsuarios(from: number = 0, limit: number = 5) {
    return this.http.get<{ usuarios: Array<Usuario>, total: number }>
      (`${this.url}?from=${from}&limit=${limit}`, { headers: this.headers })
      .pipe(
        delay(500),
        map((response) => {
          const usuarios = response.usuarios.map(
            usuario => {
              const { uid, name, email, image, role, google } = usuario;
              return new Usuario(name, email, '', uid, role, image, google);
            }
          );
          response.usuarios = usuarios;
          return response;
        })
      );
  }

  private get headers() {
    return new HttpHeaders({
      'x-token': this._token!
    });
  }
}
