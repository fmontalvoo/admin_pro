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

  public listarHospitales(from: number = 0, limit: number = 5): Observable<Array<Hospital>> {
    return this.http.get<{ hospitales: Hospital[] }>(this.url, { headers: this.headers })
      .pipe(map((response: { hospitales: Hospital[] }) => response.hospitales));
  }

  private get headers() {
    return new HttpHeaders({
      'x-token': this._token!
    });
  }
}
