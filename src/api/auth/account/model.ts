//账号的查询条件用的模型
export interface AccountQuery extends PageQuery {
  fromDate?: Date;
  toDate?: Date;
  loginName?: string;
  status?: number;
}

//账号列表用的模型
export interface AccountModel {
  id?: string;
  loginName?: string;
  addTime?: Date;
  status?: number;
  statusDesc?: string;
  lastLoginTime?: Date;
  lastLoginIP?: string;
  memo?: string;
}

//编辑账号用的模型
export interface AccountEditModel {
  id?: string;
  loginName?: string;
  status?: boolean;
  memo?: string;
}

//新增账号用的模型
export interface AccountAddModel {
  loginName?: string;
  password?: string;
  memo?: string;
}

//更新账号状态用的模型
export interface AccountUpdateStatusModel {
  id?: string;
  status?: number;
}