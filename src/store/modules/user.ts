import { defineStore } from 'pinia';
import { UserState } from '@/types/store/user';
import { localStorage } from '@/utils/storage';
import api from '@/api/auth';
import { resetRouter } from '@/router';

const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        token: localStorage.get('token') || '',
        id: '',
        nickname: '',
        companyName: '',
        avatar: '',
        roles: [],
        perms: []
    }),
    actions: {
        async RESET_STATE() {
            this.$reset();
        },
        /**
         * 检查 Ticket
         */
        login(data: any) {
            return new Promise((resolve, reject) => {
                // 测试 
                const token = 'mantulife' as string
                localStorage.set('token', token);
                this.token = token;
                resolve(token);

                // api
                //   .login(data)
                //   .then((response: any) => {
                //     const { token } = response.data;
                //     localStorage.set('token', token);
                //     this.token = token;
                //     resolve(token);
                //   })
                //   .catch((error: any) => {
                //     reject(error);
                //   });
            });
        },
        /**
         * 检查 Ticket
         */
        checkTicket(data: any) {
            return new Promise((resolve, reject) => {
                api
                    .checkSecret(data)
                    .then((response: any) => {
                        const { token } = response.data;
                        localStorage.set('token', token);
                        this.token = token;
                        resolve(token);
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
            });
        },
        /**
         *  获取用户信息（昵称、头像、角色集合、权限集合）
         */
        getUserInfo() {
            return new Promise((resolve, reject) => {
                // 测试数据
                const data = {
                    name: 'name', avatar: "https://www.mantulife.com/_nuxt/img/e22ed26.jpg",
                    companyName: '漫涂拾光', id: "mantulife"
                };
                const { name, avatar, companyName, id } = data
                this.id = id;
                this.nickname = name;
                this.companyName = companyName;
                this.avatar = avatar;
                this.roles = ['admin'];
                resolve(data);


                // api
                //     .getLoginInfo()
                //     .then(({ data }) => {
                //         if (!data) {
                //             return reject('Verification failed, please Login again.');
                //         }
                //         const { name, avatar, companyName, id } = data.info;
                //         this.id = id;
                //         this.nickname = name;
                //         this.companyName = companyName;
                //         this.avatar = avatar;
                //         this.roles = ['admin'];
                //         resolve(data);
                //     })
                //     .catch(error => {
                //         reject(error);
                //     });
            });
        },

        /**
         *  注销
         */
        logout() {
            return new Promise((resolve, reject) => {
                api
                    .logout()
                    .then(() => {
                        localStorage.remove('token');
                        this.RESET_STATE();
                        resetRouter();
                        resolve(null);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        /**
         * 清除 Token
         */
        resetToken() {
            return new Promise(resolve => {
                localStorage.remove('token');
                this.RESET_STATE();
                resolve(null);
            });
        }
    }
});

export default useUserStore;
