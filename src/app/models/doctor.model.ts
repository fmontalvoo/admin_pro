import { Hospital } from "./hospital.model";

export class Doctor {
    constructor(
        public name: string,
        public image?: string,
        public user?: _User,
        public hospital?: Hospital,
        public id?: string,
    ) { }
}

interface _User {
    _id?: string;
    name: string;
    email: string;
    image?: string;
}