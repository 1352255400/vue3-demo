import { PageQueryParam, PageResult } from '../base';

// 详情
export interface Info {
    id: string; // 主键id
    companyId: string; // 公司id
    name: string; // kpi名称
    createrId: string; // 创建人id
    createrName: string; // 创建人名字
    updaterId: string; // 编辑人
    updaterName: string; // 编辑人名字
    createTime: string; // 创建时间
    updateTime: string; // 编辑时间
}

// 查询条件
export interface QueryParam extends PageQueryParam {
    id: string; // 主键id
    companyId: string; // 公司id
    name: string; // kpi名称
    createrId: string; // 创建人id
    createrName: string; // 创建人名字
    updaterId: string; // 编辑人
    updaterName: string; // 编辑人名字
    createTime: string; // 创建时间
    updateTime: string; // 编辑时间
}

// 分页列表项声明
export interface Item {
    id: string; // 主键id
    companyId: string; // 公司id
    name: string; // kpi名称
    createrId: string; // 创建人id
    createrName: string; // 创建人名字
    updaterId: string; // 编辑人
    updaterName: string; // 编辑人名字
    createTime: string; // 创建时间
    updateTime: string; // 编辑时间
}

// 分页项类型声明
export type PageResult = PageResult<Item[]>;

// 表单类型声明
export interface FormData {
    phone: string,
    pwd: string,
    captchaCode: string,
    uuid: string,
}