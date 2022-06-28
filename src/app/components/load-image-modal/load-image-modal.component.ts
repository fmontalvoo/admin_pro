import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { ImageModalService } from 'src/app/services/image-modal.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-load-image-modal',
  templateUrl: './load-image-modal.component.html',
  styles: [
  ]
})
export class LoadImageModalComponent implements OnInit, OnDestroy {
  public imagen?: File;
  public imgTemp: string = '';
  public porcentaje: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(public ims: ImageModalService, private ufs: UploadFilesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public subirImagen(): void {
    const sub = this.ufs.uploadFlie(this.imagen!, this.ims.coleccion!, this.ims.uid!)
      .subscribe({
        next: (event) => {
          const obj = JSON.parse(JSON.stringify(event));
          if (obj.hasOwnProperty('total') && obj.hasOwnProperty('loaded')) {
            this.porcentaje = obj.loaded * 100 / obj.total;
          }
        },
        error: (e) => {
          Swal.fire('¡Algo salio mal!', e.error.message, 'error');
        },
        complete: () => {
          this.imgTemp = '';
          this.porcentaje = 0;
          this.ims.cerrarModal();
          this.imagen = undefined;
          this.ims.imgChange.emit();
          Swal.fire('¡Actualizado!', 'La foto de perfil fue actualizada', 'success');
        }
      });
    this.subscription.add(sub);

    // this.ufs.actualizarImagen(this.imagen!, this.ims.coleccion!, this.ims.uid!)
    //   .then(data => {
    //     console.log(data);
    //     this.imgTemp = '';
    //     this.ims.cerrarModal();
    //     this.ims.imgChange.emit();
    //     Swal.fire('¡Actualizado!', 'La foto de perfil fue actualizada', 'success');
    //   })
    //   .catch(e =>
    //     Swal.fire('¡Algo salio mal!', e.error.message, 'error')
    //   );
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
    this.porcentaje = 0;
    this.ims.cerrarModal();
    this.imagen = undefined;
  }

}
