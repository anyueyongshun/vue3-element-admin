//通知的查询条件用的模型
export interface NoticeQuery extends PageQuery {
  fromDate?: Date;
  toDate?: Date;
  title?: string;
  publishStatus?: number;
}

//通知列表用的模型
export interface NoticeModel {
  id?: string;
  type?: number;
  typeName?: string;
  title?: string;
  contents?: string;
  memo?: string;
  publishStatus?: number;
  status?: number;
  addTime?: Date;
  addAccountName?: string;
}

//通知创建用的模型
export interface NoticeAddModel {
  type?: number;
  title?: string;
  contents?: string;
  memo?: string;
  publishStatus?: number;
  AccountIds?: string[];
}

//通知编辑用的模型
export interface NoticeEditModel {
  id?: string;
  title?: string;
  contents?: string;
  memo?: string;
  publishStatus?: number;
  AccountIds?: string[];
}

//通知更新发布状态用的模型
export interface NoticeUpdatePublishStatusModel {
  id?: string;
  publishStatus?: number;
}

//通知更新状态用的模型
export interface NoticeUpdateStatusModel {
  id?: string;
  status?: number;
}
