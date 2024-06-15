import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Tree } from "./model";
import {
  RoleAddModel,
  RoleEditModel,
  RoleUpdateStatusModel,
  RoleAuthorityModel,
  RoleMenuModel,
} from "./model";

//加载角色树
export function loadTree() {
  return request<any, Tree>({
    url: "/role/GetRoleTree",
    method: "get",
  });
}

//新增角色
export function addRole(data: RoleAddModel): AxiosPromise<boolean> {
  return request({
    url: "/role/add",
    method: "post",
    data: data,
  });
}

//编辑角色
export function editRole(data: RoleEditModel): AxiosPromise<boolean> {
  return request({
    url: "/role/update",
    method: "post",
    data: data,
  });
}

//更新角色状态
export function updateStatus(
  data: RoleUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/role/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取角色明细
export function getDetail(id: string) {
  return request<any, RoleEditModel>({
    url: "/role/GetById?id=" + id,
    method: "get",
  });
}

//角色添加权限
export function assignMenu(data: RoleAuthorityModel): AxiosPromise<boolean> {
  return request({
    url: "/role/AddMenu",
    method: "post",
    data: data,
  });
}

//角色添加菜单
export function assignAuth(data: RoleMenuModel): AxiosPromise<boolean> {
  return request({
    url: "/role/addAuth",
    method: "post",
    data: data,
  });
}

//取角色拥有的权限
export function getAuthorityIds(id: string) {
  return request<any, string[]>({
    url: "/role/GetAuthorityIds?roleId=" + id,
    method: "get",
  });
}

//取角色拥有的菜单
export function getMenuIds(id: string) {
  return request<any, string[]>({
    url: "/role/GetMenuIds?roleId=" + id,
    method: "get",
  });
}
