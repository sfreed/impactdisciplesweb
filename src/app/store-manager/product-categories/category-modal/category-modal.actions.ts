import { TagModel } from "impactdisciplescommon/src/models/domain/tag.model";

export class ShowCategoryModal {
  static readonly type = '[CATEGORY] Show Category';
  constructor(public category?: TagModel){}
}