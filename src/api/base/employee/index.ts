import request from "@/utils/request";
import { AxiosPromise } from "axios";
import type { CascaderOption } from "element-plus";
import {
  OrgEmployeeSelectTreeModel,
  QueryModel,
  EmployeeModel,
  EmployeeListModel,
  EmployeeAddModel,
  EmployeeUpdateStatusModel,
} from "./model";

//取组织机构员工数据
export function getOrgEmployeeTree() {
  return request<any, OrgEmployeeSelectTreeModel>({
    url: "/employee/GetOrgEmployeeTree",
    method: "get",
  });
}

//员工分页查询
export function getEmployeePage(queryParams: QueryModel) {
  return request<any, PageResult<EmployeeListModel[]>>({
    url: "/Employee/PageList",
    method: "get",
    params: queryParams,
  });
}

//导出员工
export function exportEmployee(queryParams: QueryModel) {
  return request({
    url: "/Employee/ExportEmployee",
    method: "get",
    params: queryParams,
    responseType: "arraybuffer",
  });
}

//新增员工
export function addEmployee(data: EmployeeAddModel): AxiosPromise<boolean> {
  return request({
    url: "/Employee/add",
    method: "post",
    data: data,
  });
}

//编辑员工
export function editEmployee(data: EmployeeAddModel): AxiosPromise<boolean> {
  return request({
    url: "/Employee/update",
    method: "post",
    data: data,
  });
}

//更新员工状态
export function updateStatus(
  data: EmployeeUpdateStatusModel
): AxiosPromise<boolean> {
  return request({
    url: "/Employee/UpdateStatus",
    method: "post",
    data: data,
  });
}

//取员工明细
export function getDetail(id: string) {
  return request<any, EmployeeModel>({
    url: "/Employee/GetById?id=" + id,
    method: "get",
  });
}

//取省市区
export function getAddressByParentId(id: string) {
  return request<any, CascaderOption[]>({
    url: "/District/GetSelectByParentId?parentId=" + id,
    method: "get",
  });
}
