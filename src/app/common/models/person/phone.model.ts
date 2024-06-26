export class Phone {
    countryCode: string;
    number: string;
    type: string;

    constructor(countryCode: string, number: string, type: string){
        this.countryCode = countryCode;
        this.number = number;
        this.type = type;
    }
}