import { WhereFilterOp } from "firebase/firestore";
import { BaseModel } from "impactdisciplescommon/src/models/base.model";

export class SplashScreen extends BaseModel{
    dbId?: string;
    title: string;
    field: string;
    condition?: WhereFilterOp;
    value: any;
    card_id: string;
}
