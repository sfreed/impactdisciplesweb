import { BaseModel } from "impactdisciplescommon/src/models/base.model";

export class Video extends BaseModel {
    dbId: string;
    video_title: string;
    video_type: string;
    video_id: string;
    video_source: string;
    video_height: number;
    video_width: number;
    video_month: string;
    video_year: string;
}
