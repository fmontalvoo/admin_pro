import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hospital } from '../models/hospital.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private url: string = `${environment.url}/hospitales`;
  private _token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  public crearHospital(name: string): Observable<any> {
    return this.http.post(this.url, { name }, { headers: this.headers });
  }

  public leerHospital(uid: string): Observable<Hospital> {
    return this.http.get(`${this.url}/${uid}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const { id, name, image, user } = response['hospital'];
          return new Hospital(name, image, user, id);
        })
      );
  }

  public actualizarHospital(uid: string, name: string) {
    return this.http.put(`${this.url}/${uid}`, { name }, { headers: this.headers });
  }

  public eliminarHospital(uid: string) {
    return this.http.delete(`${this.url}/${uid}`, { headers: this.headers });
  }

  public listarHospitales(): Observable<Array<Hospital>> {
    return this.http.get<{ hospitales: Hospital[] }>(this.url, { headers: this.headers })
      .pipe(map((response: { hospitales: Hospital[] }) => response.hospitales));
  }

  private get headers() {
    return new HttpHeaders({
      'x-token': this._token!
    });
  }
}
