export class Hospital {
    constructor(
        public name: string,
        public image?: string,
        public user?: _User,
        public id?: string,
    ) { }
}

interface _User {
    _id?: string;
    name: string;
    email: string;
    image?: string;
}