import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.url}/usuarios`;

  constructor(private http: HttpClient) { }

  public crearUsuarios(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.url, { name, email, password })
      .pipe(
        tap((response: any) =>
          localStorage.setItem('accessToken', response['token'])
        )
      );
  }
}
