import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { OrgEmployeeSelectTreeModel } from "./model";

//取组织机构员工数据
export function getOrgEmployeeTree() {
  return request<any, OrgEmployeeSelectTreeModel>({
    url: "/employee/GetOrgEmployeeTree",
    method: "get",
  });
}
