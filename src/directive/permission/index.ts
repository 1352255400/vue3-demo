import useStore from '@/store';
import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮权限校验-使用：v-checkPermissions="'btn.search'"
 */
export const checkPermissions: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「其他角色」按钮权限校验
    const { value } = binding;
    if (value.trim()) {
      const arr = value.split('|') as any[];
      // 获取按钮权限
      const { permission } = useStore();
      let num = 0;
      arr.forEach(v => {
        if (num == 0 && permission.btnRoutes[v]) {
          num++;
        }
      });
      if (num == 0) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};

/**
 * 角色权限校验
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      const requiredRoles = value; // DOM绑定需要的角色编码
      const { user } = useStore();
      const hasRole = user.roles.some(perm => {
        return requiredRoles.includes(perm);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    }
  }
};
