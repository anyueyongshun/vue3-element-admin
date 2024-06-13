import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { QueryModel, LogModel } from "./model";

//加载日志列表
export function getLogPage(queryParams: QueryModel) {
  return request<any, PageResult<LogModel[]>>({
    url: "/SystemLog/PageList",
    method: "get",
    params: queryParams,
  });
}

//取日志明细
export function getDetail(id: string) {
  return request<any, LogModel>({
    url: "/SystemLog/GetById?id=" + id,
    method: "get",
  });
}

//删除日志
export function deleteLog(id: string) {
  return request<any, LogModel>({
    url: "/SystemLog/delete?id=" + id,
    method: "get",
  });
}
