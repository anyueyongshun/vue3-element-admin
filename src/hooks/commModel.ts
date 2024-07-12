//select控件使用模型
export interface SelectModel {
  label: string;
  value: string;
  children?: SelectModel[];
}
