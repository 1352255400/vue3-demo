## 项目介绍

[vue3-element-admin](https://github.com/1352255400/vue3-demo) 是基于 [vue-element-admin](https://gitee.com/panjiachen/vue-element-admin) 升级的 Vue3 版本后台管理前端解决方案；使用前端主流技术栈 Vue3 + Vite2 + TypeScript + Vue Router + Pinia + Volar + Element Plus 等；实现功能包括不限于动态权限路由、按钮权限控制、国际化、主题大小切换等；

## 项目优势

- 基于 vue-element-admin 升级的 Vue3 版本 ，极易上手，减少学习成本；
- 一套完整适配的微服务权限系统线上接口，企业级真实前后端接入场景，非 Mock 数据；
- 功能全面：国际化、动态路由、按钮权限、主题大小切换、Echart、wangEditor；
- TypeScript 全面支持，包括组件和 API 调用层面；
- 主流 Vue3 生态和前端技术栈，常用组件极简封装；
- 从 0 到 1 的项目文档支持；
- 全栈技术支持: 微服务接口、Vue3 管理前端、uni-app 移动端和 K8S 持续集成交付；

## 技术栈

| 技术栈 | 描述 | 官网 |
| --- | --- | --- |
| Vue3 | 渐进式 JavaScript 框架 | https://v3.cn.vuejs.org/ |
| TypeScript | JavaScript 的一个超集 | https://www.tslang.cn/ |
| Vite2 | 前端开发与构建工具 | https://cn.vitejs.dev/ |
| Element Plus | 基于 Vue 3，面向设计师和开发者的组件库 | https://element-plus.gitee.io/zh-CN/ |
| Pinia | 新一代状态管理工具 | https://pinia.vuejs.org/ |
| Vue Router | Vue.js 的官方路由 | https://router.vuejs.org/zh/ |


## 项目地址

|  | Gitee | Github |
| --- | --- | --- |
| vue3-element-admin | [vue3-element-admin](https://github.com/1352255400/java-demo) | [vue3-element-admin](https://github.com/1352255400/java-demo) |

## 启动部署

### 环境准备

- 安装 Node

  版本：v14 或 v16

- 开发工具

  推荐 VSCode

- 必装插件

  VSCode 插件市场搜索并安装 Volar, 且一定要禁用 Vetur，不然代码会出现组件使用了但编译器还报组件未使用的警告信息，另外尤大也在 Vue3 生态话题说过 Volar 将会替代 Vetur 作为 Vue 的官方插件。

### 项目启动

1. npm install
2. npm run dev
3. 浏览器访问 http://localhost:3000

### 项目部署

- 本地打包

  ```
  npm run build:prod
  ```

  生成的静态文件位于项目根目录 dist 文件夹下

- nginx.cofig 配置

  ```
  server {
      listen     80;
      server_name  localhost;

      location / {
          root /usr/share/nginx/html/web;
          index index.html index.htm;
      }

      # 代理转发请求至网关，prod-api标识解决跨域问题
      location /prod-api/ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass https://www.mantulife.com/api;
      }
  }

  ```
