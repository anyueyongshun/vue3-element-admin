import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Tree } from "./model";
import { MenuAddModel, MenuEditModel, MenuUpdateStatusModel } from "./model";
import { AccountModel } from "@/api/auth/account/model";

//加载菜单树
export function loadTree() {
  return request<any, Tree>({
    url: "/menu/GetMenuTree",
    method: "get",
  });
}

//新增菜单
export function addMenu(data: MenuAddModel): AxiosPromise<boolean> {
  return request({
    url: "/menu/add",
    method: "post",
    data: data,
  });
}

//编辑菜单
export function editMenu(data: MenuEditModel): AxiosPromise<boolean> {
  return request({
    url: "/menu/update",
    method: "post",
    data: data,
  });
}

//更新菜单状态
export function updateStatus(
  data: MenuUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/menu/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取菜单明细
export function getDetail(id: string) {
  return request<any, MenuEditModel>({
    url: "/menu/GetById?id=" + id,
    method: "get",
  });
}

//获取拥有此菜单的账号
export function getAccounts(id: string) {
  return request<any, AccountModel[]>({
    url: "/menu/GetAccounts?menuId=" + id,
    method: "get",
  });
}
