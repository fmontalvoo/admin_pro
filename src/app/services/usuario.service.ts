import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.url}/usuarios`;
  private _token = localStorage.getItem('accessToken');
  constructor(private http: HttpClient) { }

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

  public leerUsuario(uid: string) {
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

  public actualizarUsuario(uid: string, name: string, email: string): Observable<any> {
    return this.http.put(`${this.url}/${uid}`, { name, email }, {
      headers: new HttpHeaders({
        'x-token': this.token
      })
    });

  }
}
