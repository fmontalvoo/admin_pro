import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Doctor } from '../models/doctor.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url: string = `${environment.url}/doctores`;
  private _token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  public crearDoctor(name: string, hospital: string): Observable<Doctor> {
    return this.http.post(this.url, { name, hospital }, { headers: this.headers })
      .pipe(map((response: any) => response.doctor));
  }

  public leerDoctor(uid: string): Observable<Doctor> {
    return this.http.get(`${this.url}/${uid}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const { id, name, image, user, hospital } = response['doctor'];
          return new Doctor(name, image, user, { id: hospital._id, name: hospital.name, image: hospital.image }, id);
        })
      );
  }

  public actualizarDoctor(uid: string, name: string, hospital: string): Observable<Doctor> {
    return this.http.put(`${this.url}/${uid}`, { name, hospital }, { headers: this.headers })
      .pipe(map((response: any) => response.doctor));
  }

  public eliminarDoctor(uid: string) {
    return this.http.delete(`${this.url}/${uid}`, { headers: this.headers });
  }

  public listarDoctores(): Observable<Array<Doctor>> {
    return this.http.get<{ doctores: Doctor[] }>(this.url, { headers: this.headers })
      .pipe(map((response: { doctores: Doctor[] }) => response.doctores));
  }

  private get headers() {
    return new HttpHeaders({
      'x-token': this._token!
    });
  }
}
