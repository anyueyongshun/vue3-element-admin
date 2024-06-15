import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Tree } from "./model";
import {
  AuthorityAddModel,
  AuthorityEditModel,
  AuthorityUpdateStatusModel,
} from "./model";

//加载权限树
export function loadTree(disabled: boolean) {
  return request<any, Tree>({
    url: "/authority/GetAuthorityTree?disabled=" + disabled,
    method: "get",
  });
}

//新增权限
export function addAuthority(data: AuthorityAddModel): AxiosPromise<boolean> {
  return request({
    url: "/authority/add",
    method: "post",
    data: data,
  });
}

//编辑权限
export function editAuthority(data: AuthorityEditModel): AxiosPromise<boolean> {
  return request({
    url: "/authority/update",
    method: "post",
    data: data,
  });
}

//更新权限状态
export function updateStatus(
  data: AuthorityUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/authority/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取权限明细
export function getDetail(id: string) {
  return request<any, AuthorityEditModel>({
    url: "/authority/GetById?id=" + id,
    method: "get",
  });
}
