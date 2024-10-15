import { BaseModel } from "impactdisciplescommon/src/models/base.model";

export class Appointment extends BaseModel{
  dbId?: string;
  text: string;
  start_date: Date;
  start_date_val: number;
  end_date: Date;
  end_date_val: number;
  all_day?: boolean;
  description: string;
  type: string
}

export class TypeData {
  text: string;
  id: number;
  color: string;
}
