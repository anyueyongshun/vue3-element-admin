import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  AccountQuery,
  AccountModel,
  AccountAddModel,
  AccountEditModel,
  AccountUpdateStatusModel,
  AccountAuthorityModel,
  AccountMenuModel,
  AccountRoleModel,
} from "./model";

//账号分页查询
export function getAccountPage(queryParams: AccountQuery) {
  return request<any, PageResult<AccountModel[]>>({
    url: "/account/PageList",
    method: "get",
    params: queryParams,
  });
}

//新增账号
export function addAccount(data: AccountAddModel): AxiosPromise<boolean> {
  return request({
    url: "/account/add",
    method: "post",
    data: data,
  });
}

//编辑账号
export function editAccount(data: AccountEditModel): AxiosPromise<boolean> {
  return request({
    url: "/account/update",
    method: "post",
    data: data,
  });
}

//更新账号状态
export function updateStatus(
  data: AccountUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/account/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取账号明细
export function getDetail(id: string) {
  return request<any, AccountEditModel>({
    url: "/account/GetById?id=" + id,
    method: "get",
  });
}
//------------------------账号添加权限，菜单，角色-----------------------------
//账号添加菜单
export function assignMenu(data: AccountMenuModel): AxiosPromise<boolean> {
  return request({
    url: "/account/AddMenu",
    method: "post",
    data: data,
  });
}

//账号添加权限
export function assignAuth(data: AccountAuthorityModel): AxiosPromise<boolean> {
  return request({
    url: "/account/addAuth",
    method: "post",
    data: data,
  });
}

//账号添加角色
export function assignRole(data: AccountRoleModel): AxiosPromise<boolean> {
  return request({
    url: "/account/addRole",
    method: "post",
    data: data,
  });
}

//取账号拥有的权限
export function getAuthorityOwnerIds(id: string) {
  return request<any, string[]>({
    url: "/account/GetAllAuthorityIds?accountId=" + id,
    method: "get",
  });
}

//取账号包含的权限
export function getAuthorityIncludeIds(id: string) {
  return request<any, string[]>({
    url: "/account/GetAuthorityIncludeIds?accountId=" + id,
    method: "get",
  });
}

//取账号排除的权限
export function getAuthorityExcludeIds(id: string) {
  return request<any, string[]>({
    url: "/account/GetAuthorityExcludeIds?accountId=" + id,
    method: "get",
  });
}

//取账号拥有的角色
export function getRoleIds(id: string) {
  return request<any, string[]>({
    url: "/account/GetRoleIds?accountId=" + id,
    method: "get",
  });
}

//取账号拥有的菜单
export function getMenuIds(id: string) {
  return request<any, string[]>({
    url: "/account/GetMenuIds?accountId=" + id,
    method: "get",
  });
}
