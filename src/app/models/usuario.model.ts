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
}