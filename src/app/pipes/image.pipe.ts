import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, coleccion: 'usuarios' | 'doctores' | 'hospitales'): string {
    if (!!image && image?.includes('googleusercontent'))
      return image;
    return `${environment.url}/uploads/${coleccion}/${!!image ? image : 'no-img.jpg'}`;
  }

}
