import { BaseModel } from "impactdisciplescommon/src/models/base.model";

export class Contact extends BaseModel {
    agent_id; string;
    first_name: string;
    last_name: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    county?: string;

    emergency_contact?: string;
    emergency_contact_relationship?: string;
    emergency_contact_phone?: string;
    emergency_contact_email?: string;

    email?: string;

    mobile_phone?: string;
    work_phone?: string;
}
