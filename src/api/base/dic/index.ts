import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Tree } from "./model";
import { OrgAddModel, OrgEditModel, OrgUpdateStatusModel } from "./model";

//加载组织机构树
export function loadTree() {
  return request<any, Tree>({
    url: "/Organization/GetOrgTree",
    method: "get",
  });
}

//新增组织机构
export function addOrg(data: OrgAddModel): AxiosPromise<boolean> {
  return request({
    url: "/Organization/add",
    method: "post",
    data: data,
  });
}

//编辑组织机构
export function editOrg(data: OrgEditModel): AxiosPromise<boolean> {
  return request({
    url: "/Organization/update",
    method: "post",
    data: data,
  });
}

//更新组织机构状态
export function updateStatus(
  data: OrgUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/Organization/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取组织机构明细
export function getDetail(id: string) {
  return request<any, OrgEditModel>({
    url: "/Organization/GetById?id=" + id,
    method: "get",
  });
}
