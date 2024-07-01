//日志配置的模型
export interface LogConfigModel {
  id?: string;
  logStoreType?: string;
  isLogin?: boolean;
  isException?: boolean;
  isOperate?: boolean;
  isWatchDog?: boolean;
}

//系统配置的模型
export interface SysConfigModel {
  id?: string;
  defaultPassword?: string;
  blackListIp?: string;
}
