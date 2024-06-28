//日志配置的模型
export interface LogConfigModel {
  id?: string;
  logStoreType?: string;
  isLogin?: boolean;
  isException?: boolean;
  isOperate?: boolean;
  isWatchDog?: boolean;
}
