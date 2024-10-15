import { Role } from "impactdisciplescommon/src/lists/roles.enum";

export class MenuItem {
  dbId?: string;
  id?: any;
  order?: number;
  label?: string;
  icon?: string;
  parentId?: any;
  link?: string;
  is_external?: boolean;
  subItems?: MenuItem[] = [];
  type: string;
  badge?: any;
  color?: string;
  visibleTo?: Role[] = [];
}
