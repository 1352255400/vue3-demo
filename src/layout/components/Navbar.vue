<template>
  <div class="navbar">
    <hamburger id="hamburger-container"
               :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container"
                class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--        <search id="header-search" class="right-menu-item" />
                <error-log class="errLog-container right-menu-item hover-effect" />-->
        <screenfull id="screenfull"
                    class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小"
                    effect="dark"
                    placement="bottom">
          <size-select id="size-select"
                       class="right-menu-item hover-effect" />
        </el-tooltip>
        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect"
                   trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'"
               class="user-avatar" />
          <CaretBottom style="width: 0.6em; height: 0.6em; margin-left: 5px" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided
                              @click="dialogVisible = true">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided
                              @click="logout">
              {{ $t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog v-model="dialogVisible"
               title="修改密码"
               width="400px">
      <el-form :model="formData"
               :rules="rules"
               label-width="120px"
               class="form-info"
               ref="dataFormRef"
               @keyup.enter="dataFormSubmit(dataFormRef)">
        <!--电话-->
        <el-form-item label="原密码："
                      prop="pwd">
          <el-input v-model="formData.pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码："
                      prop="newPwd">
          <el-input v-model="formData.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码："
                      prop="pwdConfirmation">
          <el-input v-model="formData.pwdConfirmation"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary"
                     class="fr"
                     @click="dataFormSubmit(dataFormRef)">{{$t('btn.confirm')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, toRefs, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus';

import useStore from '@/store';

// 引入接口
// import api from '@/api/openplatform/openPlatformAccount';
// import apiRole from '@/api/openplatform/openPlatformRole';
// import types from '@/types/api/openplatform/openPlatformAccount';
// 引入多语言翻译方法
import { translate } from '@/utils/i18n';
import { validPwd } from '@/utils/validate';

// 组件依赖
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';

// 图标依赖
import { CaretBottom } from '@element-plus/icons-vue';
const dataFormRef = ref<FormInstance>();

const { app, user, tagsView } = useStore();

const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const avatar = computed(() => user.avatar);

//  reactive是Vue3中提供实现响应式数据的方法
const state = reactive({
  dialogVisible: false as boolean,
  // 表单数据
  formData: {
    pwd: '',
    newPwd: '',
    pwdConfirmation: ''
  } as any
});

const { dialogVisible, formData } = toRefs(state);

// 表单验证字段+规则
const validEmpty = (rule: any, value: any, callback: any) => {
  // 检查密码强度
  if (!validPwd(value.trim())) {
    callback(new Error('密码强度不够：必须包含大小写和数字'));
  }
  if (rule.field == 'pwdConfirmation' && value != state.formData.newPwd) {
    callback(new Error('新密码和确认密码不一致'));
  }
  callback();
};

// 表单验证字段+规则
const rules = reactive<FormRules>({
  pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
  ],
  newPwd: [
    { required: true, validator: validEmpty, trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
  ],
  pwdConfirmation: [
    { required: true, validator: validEmpty, trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
  ]
});

function toggleSideBar() {
  app.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    user
      .logout()
      .then(() => {
        tagsView.delAllViews();
      })
      .then(() => {
        router.go(0);
      });
  });
}

// 表单提交
const dataFormSubmit = async (data: FormInstance | undefined) => {
  if (!data) return;
  // 表单验证
  await data.validate((valid, fields) => {
    if (valid) {
      // 提交数据
      //   api.updatePwd(state.formData).then((response: any) => {
      //     if (response.code === 0) {
      //       ElMessage.success('success');
      //       state.dialogVisible = false;
      //       resetForm(dataFormRef.value);
      //       close();
      //     } else {
      //       ElMessage.error(response.msg);
      //     }
      //   });
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
