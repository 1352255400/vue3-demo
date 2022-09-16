import { PageQueryParam, PageResult } from './base';

// 详情
export interface Info {
  id: string; // 主键
  accountId: string; // 用户id
  serviceId: string; // 服务id
  serviceName: string;
  serviceAppId: string;
  name: string; // 名称m
  code: string; // 名称
  appid: string; // appid
  appkey: string; // appkey
  remark: string; // 备注
  status: number; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 查询条件
export interface QueryParam extends PageQueryParam {
  id: string; // 主键
  accountId: string; // 用户id
  serviceId: string; // 服务id
  serviceName: string;
  serviceAppId: string;
  name: string; // 名称
  code: string; // 名称
  appid: string; // appid
  appkey: string; // appkey
  remark: string; // 备注
  status: number; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 分页列表项声明
export interface Item {
  id: string; // 主键
  accountId: string; // 用户id
  serviceId: string; // 服务id
  serviceName: string;
  serviceAppId: string;
  name: string; // 名称
  code: string; // 名称
  appid: string; // appid
  appkey: string; // appkey
  remark: string; // 备注
  status: number; // 状态
  requestNum: number;
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 分页项类型声明
export type Result = PageResult<Item[]>;

// 表单类型声明
export interface FormData {
  id: string; // 主键
  accountId: string; // 用户id
  serviceId: string; // 服务id
  serviceName: string;
  serviceAppId: string;
  name: string; // 名称m
  code: string; // 名称
  appid: string; // appid
  appkey: string; // appkey
  remark: string; // 备注
  status: number; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 表单类型声明
export interface FormDataStatus {
  id: string; // 主键
  status: number; // 状态
}

// 导入表单类型声明
export interface ImportFormData {
  id: string; // 主键
  accountId: string; // 用户id
  serviceId: string; // 服务id
  serviceName: string;
  serviceAppId: string;
  name: string; // 名称
  code: string; // 名称
  appid: string; // appid
  appkey: string; // appkey
  remark: string; // 备注
  status: number; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}
