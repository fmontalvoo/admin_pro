import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private url: string = `${environment.url}/search`;
  private _token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  public buscar(query: string, coleccion: 'usuarios' | 'doctores' | 'hospitales') {
    return this.http.get<Array<any>>(`${this.url}/${coleccion}?q=${query}`,
      { headers: this.headers })
      .pipe(
        map((response: any) => {
          const resultados = response['resultados'];
          switch (coleccion) {
            case 'usuarios':
              return resultados.map(
                (usuario: any) => {
                  const { uid, name, email, image, role, google } = usuario;
                  return new Usuario(name, email, '', uid, role, image, google);
                }
              );

            case 'doctores':
              return resultados.map(
                (doctor: any) => {
                  const { id, name, image, user, hospital } = doctor;
                  return new Doctor(name, image, user, hospital, id);
                }
              );

            case 'hospitales':
              return resultados.map(
                (hospital: any) => {
                  const { id, name, image, user } = hospital;
                  return new Hospital(name, image, user, id);
                }
              );

            default:
              return [];
          }
        })
      );
  }

  public busquedaGeneral(query: string) { 
    return this.http.get<Array<any>>(`${this.url}?q=${query}`,
    { headers: this.headers });
  }

  private get headers() {
    return new HttpHeaders({
      'x-token': this._token!
    });
  }
}
