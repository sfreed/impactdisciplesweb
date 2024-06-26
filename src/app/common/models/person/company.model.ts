import { BaseModel } from "../base.model";
import { Address } from "./address.model";
import { Phone } from "./phone.model";

export class Company extends BaseModel {
    name: string;
    address: Address;
    phone: Phone;

    constructor(name: string, address: Address, phone: Phone){
        super();
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}