import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private url: string = `${environment.url}/uploads`;
  private token = localStorage.getItem('accessToken') || '';

  constructor(private http: HttpClient, private as: AuthService) { }

  public async actualizarImagen(archivo: File, coleccion: 'usuarios' | 'doctores' | 'hospitales', id: string) {
    try {
      const uploadUrl = `${this.url}/${coleccion}/${id}`;
      const formData = new FormData();
      formData.append('image', archivo);

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-token': this.token,
        },
        body: formData
      });

      if (response.status === 200) {
        const data = await response.json();
        this.as.usuario.image = data['fileName'];
        return data;
      }

    } catch (error) {
      return false;
    }
  }

  public fileUpload(fileItem: File, coleccion: string, id: string) {
    const uploadUrl = `${this.url}/${coleccion}/${id}`;
    const formData: FormData = new FormData();
    formData.append('imagen', fileItem, fileItem.name);
    return this.http.put(uploadUrl, formData, {
      reportProgress: true,
      headers: new HttpHeaders({
        'x-token': this.token
      })
    });
  }
}
