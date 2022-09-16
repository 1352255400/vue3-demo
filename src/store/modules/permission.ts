import { PermissionState } from '@/types/store/permission';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes, syncRoute } from '@/router';
import api from '@/api/auth';

// 路由过滤-code方式
export const filterAsyncRoutes = (
    routes: RouteRecordRaw[],
    roles: string[]
) => {
    const res: RouteRecordRaw[] = [];

    routes.forEach(route => {
        const tmp = { ...route } as any;
        if (roles[tmp.name]) {
            res.push(tmp);
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
        }
    });
    return res;
};

const usePermissionStore = defineStore({
    id: 'permission',
    state: (): PermissionState => ({
        routes: [],
        btnRoutes: [],
        addRoutes: []
    }),
    actions: {
        setRoutes(routes: RouteRecordRaw[], roles: string[]) {
            this.addRoutes = routes;
            this.btnRoutes = roles;
            this.routes = constantRoutes.concat(routes);
        },

        // 获取用户权限
        generateRoutes() {
            return new Promise((resolve, reject) => {
                // 测试数据
                const roleAccess: any = [];
                const accessedRoutes = roleAccess
                    ? filterAsyncRoutes(syncRoute, roleAccess)
                    : [];
                this.setRoutes(accessedRoutes, roleAccess);
                resolve(accessedRoutes);

                // 获取用户权限接口
                // api
                //   .getPermissions()
                //   .then(response => {
                //     const roleAccess: any = response.data.list
                //       ? (response.data.list as any)
                //       : [];
                //     const accessedRoutes = roleAccess
                //       ? filterAsyncRoutes(syncRoute, roleAccess)
                //       : [];
                //     this.setRoutes(accessedRoutes, roleAccess);
                //     resolve(accessedRoutes);
                //   })
                //   .catch(error => {
                //     reject(error);
                //   });
            });
        }
    }
});

export default usePermissionStore;
