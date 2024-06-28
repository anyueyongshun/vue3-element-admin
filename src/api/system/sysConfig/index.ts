import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LogConfigModel } from "./model";

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
