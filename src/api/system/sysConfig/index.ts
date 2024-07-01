import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LogConfigModel, SysConfigModel } from "./model";

//取日志配置
export function GetLogConfig() {
  return request<any, LogConfigModel>({
    url: "/Configitem/GetLogConfig",
    method: "get",
  });
}

//更新日志配置
export function UpdateLogConfig(data: LogConfigModel): AxiosPromise<boolean> {
  return request({
    url: "/Configitem/UpdateLogConfig",
    method: "post",
    data: data,
  });
}

//取系统配置
export function GetSysConfig() {
  return request<any, SysConfigModel>({
    url: "/Configitem/GetSysConfig",
    method: "get",
  });
}

//更新系统配置
export function UpdateSysConfig(data: SysConfigModel): AxiosPromise<boolean> {
  return request({
    url: "/Configitem/UpdateSysConfig",
    method: "post",
    data: data,
  });
}
