import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  DicGroupAddModel,
  DicGroupEditModel,
  DicGroupUpdateStatusModel,
  QueryModel,
  DicGroupModel,
} from "./model";

//加载字典组列表
export function getDicGroupPage(queryParams: QueryModel) {
  return request<any, PageResult<DicGroupModel[]>>({
    url: "/DicGroup/PageList",
    method: "get",
    params: queryParams,
  });
}

//加载字典组列表
export function getDicGroups() {
  return request<any, PageResult<DicGroupModel[]>>({
    url: "/DicGroup/GetAll",
    method: "get",
  });
}

//新增字典组
export function addDicGroup(data: DicGroupAddModel): AxiosPromise<boolean> {
  return request({
    url: "/DicGroup/add",
    method: "post",
    data: data,
  });
}

//编辑字典组
export function editDicGroup(data: DicGroupEditModel): AxiosPromise<boolean> {
  return request({
    url: "/DicGroup/update",
    method: "post",
    data: data,
  });
}

//更新字典组状态
export function updateStatus(
  data: DicGroupUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/DicGroup/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取字典组明细
export function getDetail(id: string) {
  return request<any, DicGroupEditModel>({
    url: "/DicGroup/GetById?id=" + id,
    method: "get",
  });
}
