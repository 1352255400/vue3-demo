import router from '@/router';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 状态管理依赖

NProgress.configure({ showSpinner: true }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/login', '/api-info', '/doc', '/code'];

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const { user, permission } = useStore();
    const hasToken = user.token;
    // 检查token
    if (hasToken) {
        // 登录成功，跳转到首页
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            // 检查是否获取过权限
            const hasGetUserInfo = user.roles.length > 0;
            if (hasGetUserInfo) {
                if (to.matched.length === 0) {
                    from.name ? next({ name: from.name as any }) : next('/401');
                } else {
                    next();
                }
            } else {
                try {
                    // 获取用户信息
                    await user.getUserInfo();
                    // 获取用户权限
                    const accessRoutes: any = await permission.generateRoutes();
                    // 追加权限路由
                    router.options.routes = accessRoutes;
                    accessRoutes.forEach((route: any) => {
                        router.addRoute(route);
                    });
                    next({ ...to, replace: true });
                } catch (error) {
                    // 移除 token 并跳转登录页
                    await user.resetToken();
                    ElMessage.error((error as any) || 'Has Error');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        // // 未登录可以访问白名单页面(登录页面)
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        } // 未登录可以访问白名单页面(登录页面) end
    }
});

router.afterEach(() => {
    NProgress.done();
});
