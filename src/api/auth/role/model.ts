import { number } from "echarts";

export declare type TreeKey = string | number;

//角色树的模型
export interface Tree {
  id?: string;
  name?: string;
  children?: Tree[];
  isAdmin?: boolean;
  parentId?: string;
  isRoot?: boolean;
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

//角色与权限的关系模型
export interface RoleAuthorityModel {
  roleId: string;
  authorityIds?: TreeKey[];
}

//角色与菜单的关系模型
export interface RoleMenuModel {
  roleId: string;
  menuIds?: TreeKey[];
}
