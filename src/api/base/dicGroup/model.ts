export interface QueryModel extends PageQuery {
  Name?: string;
}

//字典组列表的模型
export interface DicGroupModel {
  id?: string;
  name?: string;
  order?: number;
  status?: number;
  statusDesc?: number;
  memo?: string;
}

//新增字典组用的模型
export interface DicGroupAddModel {
  name?: string;
  order?: number;
  status?: number;
  memo?: string;
}

//编辑字典组用的模型
export interface DicGroupEditModel {
  id?: string;
  name?: string;
  order?: number;
  status?: number;
  memo?: string;
}

//更新字典组状态用的模型
export interface DicGroupUpdateStatusModel {
  id?: string;
  status?: number;
}
