import request from '@/utils/request';
import { AxiosPromise } from 'axios';

// 加载模型实体
import { Result } from '@/types/api/common';

// 模块名：common
export default {
  // 获取cos签名 getAll(): AxiosPromise<types.PageResult> {
  getCosSign(params: any): AxiosPromise<Result> {
    return request({
      url: '/openplatform/cos/getSign',
      method: 'get',
      params
    });
  },

  // 获取验证码
  getCaptcha() {
    return request({
      url: '/openplatform/auth/captcha',
      method: 'get'
    });
  }
};
