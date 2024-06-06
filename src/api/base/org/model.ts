//组织机构树的模型
export interface Tree {
  id?: string;
  name?: string;
  children?: Tree[];
  orgType?: number;
}

//新增组织机构用的模型
export interface OrgAddModel {
  parentId?: string;
  name?: string;
  order?: number;
  orgType?: boolean;
  memo?: string;
}

//编辑组织机构用的模型
export interface OrgEditModel {
  id?: string;
  name?: string;
  order?: number;
  orgType?: boolean;
  memo?: string;
  status?: number;
}

//更新组织机构状态用的模型
export interface OrgUpdateStatusModel {
  id?: string;
  status?: number;
}
