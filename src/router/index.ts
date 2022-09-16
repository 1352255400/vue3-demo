import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useStore from '@/store';

export const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        name: 'redirect',
        path: '/redirect',
        meta: { title: 'redirect', hidden: true },
        component: Layout,
        children: [
            {
                name: 'redirect',
                path: '/redirect/:path(.*)',
                meta: { title: 'redirect', hidden: true },
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: { title: 'login', hidden: true },
        component: () => import('@/views/login/index.vue')
    },
    {
        name: '404',
        path: '/404',
        meta: { title: '404', hidden: true },
        component: () => import('@/views/error-page/404.vue')
    },

    {
        name: 'all',
        path: '/',
        meta: { title: 'all' },
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                name: 'Dashboard',
                path: 'dashboard',
                meta: { title: 'dashboard', icon: 'homepage', affix: true },
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                name: '401',
                path: '401',
                meta: { title: '401', hidden: true },
                component: () => import('@/views/error-page/401.vue')
            }
        ]
    },
    {
        name: 'demo',
        path: '/demo',
        meta: {
            title: 'demo',
            icon: 'system',
        },
        redirect: '/demo',
        component: Layout,
        children: [
            {
                name: 'demo',
                path: '/demo',
                meta: {
                    title: 'demo',
                    icon: 'system',
                    noCache: true
                },
                component: () => import('@/views/demo/index.vue')
            }
        ]
    },
];

// 动态路由
const routeList: Array<RouteRecordRaw> = [];
const files = import.meta.globEager('./modules/**/*.ts');
Object.keys(files).forEach(fileName => {
    routeList.push(files[fileName].default);
});

// 动态路由
export const syncRoute: Array<RouteRecordRaw> = routeList;

// 创建路由
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE), //createWebHistory(hash), createWebHashHistory（/#/）
    routes: constantRoutes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 })
});

// 重置路由
export function resetRouter() {
    const { permission } = useStore();
    permission.routes.forEach(route => {
        const name = route.name;
        if (name && router.hasRoute(name)) {
            router.removeRoute(name);
        }
    });
}

export default router;
