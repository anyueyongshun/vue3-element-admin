import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DicModel } from "./model";
import {
  DicAddModel,
  DicEditModel,
  DicUpdateStatusModel,
  QueryModel,
} from "./model";

//加载字典列表
export function getDicGroupPage(queryParams: QueryModel) {
  return request<any, PageResult<DicModel[]>>({
    url: "/Dic/PageList",
    method: "get",
    params: queryParams,
  });
}

//新增字典
export function addDic(data: DicAddModel): AxiosPromise<boolean> {
  return request({
    url: "/Dic/add",
    method: "post",
    data: data,
  });
}

//编辑字典
export function editDic(data: DicEditModel): AxiosPromise<boolean> {
  return request({
    url: "/Dic/update",
    method: "post",
    data: data,
  });
}

//更新字典状态
export function updateStatus(
  data: DicUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/Dic/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取字典明细
export function getDetail(id: string) {
  return request<any, DicEditModel>({
    url: "/Dic/GetById?id=" + id,
    method: "get",
  });
}
