export declare type TreeKey = string | number;

//选择员工的模型
export interface OrgEmployeeSelectTreeModel {
  id?: string;
  name?: string;
  parentId?: string;
  type?: number;
  children?: OrgEmployeeSelectTreeModel[];
}

//员工查询模型
export interface QueryModel extends PageQuery {
  name?: string;
  loginName?: string;
  jobNumber?: string;
  orgId?: string;
  mobile?: string;
}

//员工模型
export interface EmployeeModel {
  id?: string;
  name?: string;
  loginName?: string;
  jobNumber?: string;
  orgName?: string;
  gender?: string;
  genderDesc?: string;
  birthday?: Date;
  idNumber?: string;
  homeAddress?: string;
  provinceName?: string;
  cityName?: string;
  areaName?: string;
  nationalityName?: string;
  politicsName?: string;
  telephone?: string;
  mobile?: string;
  shortNumber?: string;
  email?: string;
  firstContactPerson?: string;
  firstContactPersonPhone?: string;
  photoPath?: string;
  qualificationName?: string;
  graduateSchool?: string;
  professional?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  entryDate?: Date;
  positiveDate?: Date;
  quitDate?: Date;
  jobStatusDesc?: string;
  jobStatus?: number;
  workPositionName?: string;
  jobPositionName?: string;
  address?: string;
  maritalStatusDesc?: string;
  memo?: string;
  status?: string;
  statusDesc?: string;
  addTime?: Date;
  addAccountName?: string;
  modifyTime?: Date;
  modifyAccountName?: string;
}

//员工列表模型
export interface EmployeeListModel {
  id?: string;
  name?: string;
  loginName?: string;
  jobNumber?: string;
  orgName?: string;
  mobile?: string;
  qualificationName?: string;
  provinceName?: string;
  address?: string;
  entryDate?: Date;
  jobStatusDesc?: string;
  jobStatus?: number;
}

//新增员工模型
export interface EmployeeAddModel {
  name?: string;
  loginName?: string;
  jobNumber?: string;
  orgId?: string;
  gender?: string;
  genderDesc?: string;
  birthday?: Date;
  idNumber?: string;
  homeAddress?: string;
  provinceid?: string;
  cityId?: string;
  areaId?: string;
  nationalityId?: string;
  politicsId?: string;
  telephone?: string;
  mobile?: string;
  shortNumber?: string;
  email?: string;
  firstContactPerson?: string;
  firstContactPersonPhone?: string;
  photoPath?: string;
  qualificationId?: string;
  graduateSchool?: string;
  professional?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  entryDate?: Date;
  positiveDate?: Date;
  quitDate?: Date;
  jobStatusDesc?: string;
  jobStatus?: number;
  workPositionId?: string;
  jobPositionId?: string;
  address?: string;
  maritalStatusDesc?: string;
  memo?: string;
  status?: string;
  statusDesc?: string;
  addTime?: Date;
  addAccountId?: string;
  modifyTime?: Date;
  modifyAccountId?: string;
}

//编辑员工模型
export interface EmployeeEditModel {}

//更新员工状态模型
export interface EmployeeUpdateStatusModel {
  id?: string;
  status?: number;
}
