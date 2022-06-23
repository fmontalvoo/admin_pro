import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { ImageModalService } from 'src/app/services/image-modal.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-load-image-modal',
  templateUrl: './load-image-modal.component.html',
  styles: [
  ]
})
export class LoadImageModalComponent implements OnInit {
  public imagen!: File;
  public imgTemp: string = '';

  constructor(public ims: ImageModalService, private ufs: UploadFilesService) { }

  ngOnInit(): void {
  }

  public subirImagen(): void {
    this.ufs.actualizarImagen(this.imagen, this.ims.coleccion!, this.ims.uid!)
      .then(data => {
        this.imgTemp = '';
        this.ims.cerrarModal();
        this.ims.imgChange.emit();
        Swal.fire('¡Actualizado!', 'La foto de perfil fue actualizada', 'success');
      })
      .catch(e =>
        Swal.fire('¡Algo salio mal!', e.error.message, 'error')
      );
  }

  public cargarImagen(event: Event): void {
    // const file = event.target?.files.item(0);
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) {
      this.imgTemp = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgTemp = reader.result?.toString()!;
    }

    this.imagen = file;
  }

  public cerrarModal(): void {
    this.imgTemp = '';
    this.ims.cerrarModal();
  }

}
