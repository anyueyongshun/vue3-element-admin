//select控件使用模型
export interface SelectModel {
  label: string;
  value: string;
  level: number;
  disabled: boolean;
  leaf: boolean;
  children?: SelectModel[];
}

export const StatusOptions = [
  {
    value: 1,
    label: "启用",
  },
  {
    value: 2,
    label: "禁用",
  },
  {
    value: 3,
    label: "删除",
  },
];

export const StatusOptionsAll = [
  {
    value: 0,
    label: "==全部==",
  },
  {
    value: 1,
    label: "启用",
  },
  {
    value: 2,
    label: "禁用",
  },
  {
    value: 3,
    label: "删除",
  },
];
