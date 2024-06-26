
import { BaseModel } from "../BaseModel";
import { Address } from "./address.model";
import { Company } from "./company.model";
import { Phone } from "./phone.model";

export class Person extends BaseModel{
    firstName: string;
    lastName: string;

    address: Address;
    phone: Phone;

    constructor(firstName: string, lastName: string, address: Address, phone: Phone){
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
    }
}
