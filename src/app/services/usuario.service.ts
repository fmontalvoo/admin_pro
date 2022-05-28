import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.url}/usuarios`;

  constructor(private http: HttpClient) { }

  public crearUsuarios(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.url, { name, email, password });
  }
}
