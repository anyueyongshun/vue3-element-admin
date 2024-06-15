//权限树的模型
export interface Tree {
  id?: string;
  name?: string;
  children?: Tree[];
  isAuth?: boolean;
  code?: string;
  parentId?: string;
  isRoot?: boolean;
}

//新增权限用的模型
export interface AuthorityAddModel {
  parentId?: string;
  name?: string;
  order?: number;
  isAuth?: boolean;
  memo?: string;
  code?: string;
}

//编辑权限用的模型
export interface AuthorityEditModel {
  id?: string;
  name?: string;
  order?: number;
  isAuth?: boolean;
  memo?: string;
  status?: string;
  code?: string;
}

//更新权限状态用的模型
export interface AuthorityUpdateStatusModel {
  id?: string;
  status?: number;
}
