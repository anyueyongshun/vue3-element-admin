export interface QueryModel extends PageQuery {
  Message?: string;
  LogType?: number;
  LoginName?: string;
  FromDate?: Date;
  ToDate?: Date;
}

//日志列表的模型
export interface LogModel {
  id?: string;
  message?: string;
  source?: string;
  stackTrace?: string;
  requestUrl?: string;
  browser?: string;
  isCookies?: boolean;
  userHostAddress?: string;
  userHostName?: string;
  userLanguages?: string;
  addTime?: Date;
  accountId?: string;
  loginName?: string;
  logType?: number;
}
