import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Tree } from "./model";
import { RoleAddModel, RoleEditModel, RoleUpdateStatusModel } from "./model";

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
