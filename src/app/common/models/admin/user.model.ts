import { Role } from "../../lists/roles.enum";
import { Address } from "../person/address.model";
import { Company } from "../person/company.model";
import { Person } from "../person/person.model";
import { Phone } from "../person/phone.model";

export class AppUser extends Person {
    email: string;
    firebaseUID: string;
    customerId: string;
    company: Company;
    role: Role;

    constructor(firstName: string, lastName: string, address: Address, phone: Phone, company: Company, email: string, firebaseUID: string, customerId: string, role: Role){
        super(firstName, lastName, address, phone);
        this.email = email;
        this.firebaseUID = firebaseUID;
        this.company = company;
        this.customerId = customerId;
        this.role = role;
    }
}