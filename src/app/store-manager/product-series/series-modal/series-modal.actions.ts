import { SeriesModel } from "impactdisciplescommon/src/models/utils/series.model";

export class ShowSeriesModal {
  static readonly type = '[SERIES] Show Series';
  constructor(public series?: SeriesModel){}
}