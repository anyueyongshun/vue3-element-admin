export interface AccountQuery extends PageQuery {
  fromDate?: Date;
  toDate?: Date;
  loginName?: string;
  status?: number;
}

export interface AccountModel {
  id?: string;
  loginName?: string;
  addTime?: Date;
  status?: number;
  statusDesc?: string;
  lastLoginTime?: Date;
  lastLoginIP?: string;
}

export interface AccountEditModel {
  id?: string;
  loginName?: string;
  status?: boolean;
}

export interface AccountAddModel {
  loginName?: string;
  password?: string;
}

export interface AccountUpdateStatusModel {
  id?: string;
  status?: number;
}

export type AccountPageResult = PageResult<AccountModel[]>;
