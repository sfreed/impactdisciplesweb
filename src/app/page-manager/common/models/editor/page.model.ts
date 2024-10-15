import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { Card } from "./card.model";
import { Form } from "./form.model";

export class Page extends BaseModel{
  dbId: string;
  name: string;
  session_expiration: number;
  is_external?: boolean = false;
  templateId: number;
  cards?: Card[] | Form[] = [];
  page_color: string =  '#ffffff';
}

