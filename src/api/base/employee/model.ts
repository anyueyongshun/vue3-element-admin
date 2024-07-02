export declare type TreeKey = string | number;

//选择员工的模型
export interface OrgEmployeeSelectTreeModel {
  id?: string;
  name?: string;
  parentId?: string;
  type?: number;
  children?: OrgEmployeeSelectTreeModel[];
}
