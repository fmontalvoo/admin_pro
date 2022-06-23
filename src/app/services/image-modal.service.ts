import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  public uid: string = '';
  public img: string = '';
  private _ocultarModal: boolean = true;
  public coleccion!: 'usuarios' | 'doctores' | 'hospitales';

  public imgChange: EventEmitter<void> = new EventEmitter();

  constructor() { }

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  public abrirModal(uid: string, coleccion: 'usuarios' | 'doctores' | 'hospitales', img: string = 'no-img.jpg'): void {
    this._ocultarModal = false;
    this.uid = uid;
    this.coleccion = coleccion;

    if (!!img && img?.includes('googleusercontent'))
      this.img = img;
    else
      this.img = `${environment.url}/uploads/${coleccion}/${img}`;
  }

  public cerrarModal(): void {
    this._ocultarModal = true;
  }

}
