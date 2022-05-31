import { environment } from "src/environments/environment";

export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public uid?: string,
        public role?: string,
        public image?: string,
        public google?: string,
    ) { }

    get imageUrl(): string {
        if (this.image?.includes('googleusercontent'))
            return this.image;
        return `${environment.url}/uploads/usuarios/${this.image ? this.image : 'no-img.jpg'}`;
    }
}