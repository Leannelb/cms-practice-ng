import { UserModel } from "./UserModel";

export interface ClientModel {
    id: number;
    company_name: string;
    address : string;
    ref:string;
    user:UserModel;
}

