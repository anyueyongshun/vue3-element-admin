export interface QueryModel extends PageQuery {
  Name?: string;
  DicGroupId?: string;
}

//字典列表的模型
export interface DicModel {
  id?: string;
  name?: string;
  order?: number;
  status?: number;
  dicGroupId?: string;
  memo?: string;
}

//新增字典用的模型
export interface DicAddModel {
  name?: string;
  order?: number;
  status?: number;
  dicGroupId?: string;
  memo?: string;
}

//编辑字典用的模型
export interface DicEditModel {
  id?: string;
  name?: string;
  order?: number;
  status?: number;
  memo?: string;
}

//更新字典状态用的模型
export interface DicUpdateStatusModel {
  id?: string;
  status?: number;
}
