import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';
import AES from '@/utils/crypto';
import { endWith } from '@/utils/validate';

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!config.headers) {
            throw new Error(
                `Expected 'config' and 'config.headers' not to be undefined`
            );
        }
        const { user } = useStore();
        if (user.token) {
            config.headers.Authorization = `${localStorage.get('token')}`;
        }

        // 获取当前语言
        config.headers.Language = localStorage.get('language')
            ? localStorage.get('language')
            : 'zh-cn';

        // AES 加密(跳过外网)
        if (
            !endWith(config.url as string, '/import') &&
            import.meta.env.VITE_APP_ENV !== 'dev'
        ) {
            config.data = AES.encrypt(JSON.stringify(config.data));
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log(response.data.type);
        // 导出无需解密
        if (response.data.type == 'application/octet-stream' || response.data instanceof ArrayBuffer) {
            return response;
        }

        // 响应数据解密
        let res = response.data;
        if (import.meta.env.VITE_APP_ENV !== 'dev') {
            res = JSON.parse(AES.decrypt(res));
        }
        const code = res.code as number;
        const msg = res.msg as string;
        // const { code, msg } = response.data;
        if (code === 0) {
            return res;
        } else {
            // 响应数据为二进制流处理(Excel导出)
            if (res.data instanceof ArrayBuffer) {
                return res;
            }
            if (response.config.url === '/openplatform/auth/checkSecret') {
                return res;
            }
            ElMessage({
                message: msg || '系统出错',
                type: 'error'
            });
            return Promise.reject(new Error(msg || 'Error'));
        }
    },
    error => {
        const { code, msg } = error.response.data;
        if (code === 'A0230') {
            // token 过期
            localStorage.clear(); // 清除浏览器全部缓存
            window.location.href = '/'; // 跳转登录页
            ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {});
        } else {
            ElMessage({
                message: msg || '系统出错',
                type: 'error'
            });
        }
        return Promise.reject(new Error(msg || 'Error'));
    }
);

// 导出 axios 实例
export default service;
