import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  AccountQuery,
  AccountModel,
  AccountAddModel,
  AccountEditModel,
  AccountUpdateStatusModel,
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
