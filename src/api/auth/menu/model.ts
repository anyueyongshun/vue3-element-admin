//菜单树的模型
export interface Tree {
  id?: string;
  name?: string;
  title?: string;
  routePath?: string;
  url?: string;
  isShow?: boolean;
  icon?: string;
  children?: Tree[];
  parentId?: string;
  isRoot?: boolean;
}

//新增菜单用的模型
export interface MenuAddModel {
  parentId?: string;
  name?: string;
  title?: string;
  routePath?: string;
  url?: string;
  isShow?: boolean;
  icon?: string;
  target?: string;
  order?: number;
  memo?: string;
}

//编辑菜单用的模型
export interface MenuEditModel {
  id?: string;
  name?: string;
  title?: string;
  routePath?: string;
  url?: string;
  isShow?: boolean;
  icon?: string;
  target?: string;
  order?: number;
  memo?: string;
  status?: number;
}

//更新菜单状态用的模型
export interface MenuUpdateStatusModel {
  id?: string;
  status?: number;
}
