//角色树的模型
export interface Tree {
  id?: string;
  name?: string;
  children?: Tree[];
  isAdmin?: boolean;
}

//新增角色用的模型
export interface RoleAddModel {
  parentId?: string;
  name?: string;
  order?: number;
  isAdmin?: boolean;
  memo?: string;
}

//编辑角色用的模型
export interface RoleEditModel {
  id?: string;
  name?: string;
  order?: number;
  isAdmin?: boolean;
  memo?: string;
  status?: number;
}

//更新角色状态用的模型
export interface RoleUpdateStatusModel {
  id?: string;
  status?: number;
}
