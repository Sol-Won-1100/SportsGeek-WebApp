import { UserModel } from "./user-model";

export class UserWithPasswordModel extends UserModel
{
    Password!:string;

    constructor() {
        super();
    }
}