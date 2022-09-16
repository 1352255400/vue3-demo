<template>
  <div class="login-container">
    <div class="top">
      <el-carousel class="carousel">
        <el-carousel-item v-for="item in banner"
                          :key="item">
          <h3 text="2xl"
              justify="center">
            <el-image :src="item"
                      fit="cover" />
          </h3>
        </el-carousel-item>
      </el-carousel>

      <el-form ref="loginFormRef"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left">
        <div class="title-container">
          <h3 class="title">{{ $t('login.title') }}</h3>
          <lang-select class="set-language" />
        </div>

        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="phone"
                    v-model="loginForm.phone"
                    :placeholder="$t('login.phone')"
                    name="phone"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    @blur="checkSecret()" />
        </el-form-item>

        <el-tooltip :disabled="capslockTooltipDisabled"
                    content="Caps lock is On"
                    placement="right">
          <el-form-item prop="pwd">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input ref="passwordRef"
                      :key="passwordType"
                      v-model="loginForm.pwd"
                      :type="passwordType"
                      placeholder="Password"
                      name="pwd"
                      tabindex="2"
                      auto-complete="on"
                      @keyup="checkCapslock"
                      @blur="checkSecret()"
                      @keyup.enter="handleLogin" />
            <span class="show-pwd"
                  @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <!-- 验证码 -->
        <el-form-item prop="captchaCode">
          <span class="svg-container">
            <svg-icon icon-class="valid_code" />
          </span>
          <el-input v-model="loginForm.captchaCode"
                    auto-complete="off"
                    :placeholder="$t('login.code')"
                    @keyup.enter="handleLogin" />
        </el-form-item>

        <el-button size="default"
                   :loading="loading"
                   type="primary"
                   style="width: 100%; margin-bottom: 30px"
                   @click.prevent="handleLogin">{{ $t('login.login') }}
        </el-button>
      </el-form>
    </div>

    <div class="info">
      <div class="title">专业全面的行业解决方案</div>
      <div class="content">
        <div class="content-left"></div>
        <div class="content-right"></div>
      </div>
    </div>

    <div class="bottom">
      <div class="footer-box">
        <ul class="footer-content">
          <h3>关于我们</h3>
          <li class="footer-item"><a href="/about"
               target="_blank">
              <!----> <span class="item-text">公司简介</span>
            </a></li>
          <li class="footer-item"><a href="/media/news"
               target="_blank">
              <!----> <span class="item-text">媒体资讯</span>
            </a></li>
          <li class="footer-item"><a href="#"
               target="_blank">
              <!----> <span class="item-text">投资者关系</span>
            </a></li>
          <li class="footer-item"><a href="#"
               target="_blank">
              <!----> <span class="item-text">加入我们</span>
            </a></li>
        </ul>
        <ul class="footer-content">
          <h3>联系商务</h3>
          <li class="footer-item"><a href="mailto:postmaster@ifun.com"
               target="_blank"><span class="item-title">合规咨询：</span> <span class="item-text">postmaster@ifun.com</span></a></li>
          <li class="footer-item"><a href="mailto:postmaster@ifun.com"
               target="_blank"><span class="item-title">商务邮箱：</span> <span class="item-text">postmaster@ifun.com</span></a></li>
          <li class="footer-item"><span class="item-title">联系电话：</span> <span class="item-text">400-888-xxx</span></li>
          <li class="footer-item"><a href="mailto:postmaster@ifun.com"
               target="_blank"><span class="item-title">市场合作：</span> <span class="item-text">postmaster@ifun.com</span></a></li>
        </ul>
        <ul class="footer-content">
          <h3>技术支持</h3>
          <li class="footer-item"><span class="item-title">推送技术支持QQ群：</span> <span class="item-text">1352255400</span></li>
          <li class="footer-item"><a href="mailto:postmaster@ifun.com"
               target="_blank"><span class="item-title">技术邮箱：</span> <span class="item-text">postmaster@ifun.com</span></a></li>
          <li class="footer-item"><a href="#"
               target="_blank">
              <!----> <span class="item-text">技术支持社区</span>
            </a></li>
        </ul>
        <ul class="footer-content">
          <h3>其他信息</h3>
          <li class="footer-item"><a href="/license"
               target="_blank">
              <!----> <span class="item-text">用户服务协议</span>
            </a></li>
          <li class="footer-item"><a href="/license/privacy"
               target="_blank">
              <!----> <span class="item-text">隐私政策</span>
            </a></li>
          <li class="footer-item"><a href="/security-promise"
               target="_blank">
              <!----> <span class="item-text">信息源安全承诺书</span>
            </a></li>
          <li class="footer-item"><a href="/disclaimer"
               target="_blank">
              <!----> <span class="item-text">退出机制</span>
            </a></li>
        </ul>
      </div>
    </div>

    <el-dialog v-model="centerDialogVisible"
               title="谷歌口令"
               width="400px"
               center>
      <el-image :src="authCode" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, nextTick } from 'vue';

// 组件依赖
import { ElForm, ElInput, ElMessage } from 'element-plus';
import router from '@/router';
import LangSelect from '@/components/LangSelect/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

// 状态管理依赖
import useStore from '@/store';

// API依赖
import api from '@/api/auth';
import { useRoute } from 'vue-router';
import types from '@/types/api/auth';

const { user } = useStore();
const route = useRoute();

const loginFormRef = ref(ElForm);
const passwordRef = ref(ElInput);
const state = reactive({
  banner: ['https://email.ifun.com/assets/login_background.68ffce10.jpg'],
  authCode: '' as string,
  centerDialogVisible: false as boolean,
  redirect: '',
  loginForm: {
    phone: '',
    pwd: '',
    captchaCode: '',
    uuid: ''
  } as types.FormData,
  loginRules: {
    phone: [{ required: true, trigger: 'blur' }],
    pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  loading: false,
  passwordType: 'password',
  captchaBase64: '',
  // 大写提示禁用
  capslockTooltipDisabled: true,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true
});

function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 1) {
    callback(new Error('The password can not be less than 6 digits'));
  } else {
    callback();
  }
}

const {
  banner,
  loginForm,
  loginRules,
  loading,
  passwordType,
  captchaBase64,
  capslockTooltipDisabled,
  showCopyright,
  centerDialogVisible,
  authCode
} = toRefs(state);

function checkCapslock(e: any) {
  const { key } = e;
  state.capslockTooltipDisabled =
    key && key.length === 1 && key >= 'A' && key <= 'Z';
}

function showPwd() {
  if (state.passwordType === 'password') {
    state.passwordType = '';
  } else {
    state.passwordType = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}

function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      user
        .login(state.loginForm)
        .then(() => {
          router.push({ path: state.redirect || '/', query: state.otherQuery });
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
          //   handleCaptchaGenerate();
        });
    } else {
      return false;
    }
  });
}

// 获取验证码
function checkSecret() {
  api.checkSecret(state.loginForm).then((response: any) => {
    if (response.code === 0 && response.data.secret) {
      state.centerDialogVisible = true;
      state.authCode = response.data.secret;
    }
  });
}

watch(
  route,
  () => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect as string;
      state.otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true
  }
);

function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

onMounted(() => {
  //   handleCaptchaGenerate();
  window.onresize = () => {
    if (state.clientHeight > document.documentElement.clientHeight) {
      state.showCopyright = false;
    } else {
      state.showCopyright = true;
    }
  };
});
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  overflow: hidden;
  .el-image {
    width: 100%;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .el-input {
    display: inline-block;
    height: 36px;
    width: 90%;
    .el-input__wrapper {
      padding: 0;
      background: transparent;
      box-shadow: none;
      width: 100% !important;
      .el-input__inner {
        // background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        height: 36px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-input__inner {
    &:hover {
      border-color: var(--el-input-hover-border, var(--el-border-color-hover));
      box-shadow: none;
    }

    box-shadow: none;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .copyright {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    color: #cccccc;
  }
}
</style>

<style lang="scss" >
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .top {
    position: relative;
    height: calc(100vh - 0px);
    .login-form {
      position: absolute;
      top: 200px;
      right: 200px;
      width: 500px;
      max-width: 100%;
      background: rgba(0, 0, 0, 0.6);
      padding: 30px 35px;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 5px 10px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .captcha {
      position: absolute;
      right: 0;
      top: 0;

      img {
        height: 42px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .carousel {
      .el-carousel__container {
        height: calc(100vh - 0px);
        background: #475669;
      }
    }
    .el-carousel__item h3 {
      display: flex;
      color: #475669;
      opacity: 0.75;
      height: calc(100vh - 0px);
      margin: 0;
    }
  }

  .info {
    display: none;
    width: 100%;
    background: #f4f9fb;
    padding-bottom: 60px;
    overflow: hidden;
    .title {
      width: 100%;
      height: 150px;
      line-height: 150px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    .content {
      width: 1200px;
      height: 500px;
      margin: 0 auto;
      .content-left {
        width: 400px;
        height: 500px;
        float: left;
        background: #3ca6fe;
      }
      .content-right {
        width: 775px;
        height: 500px;
        float: right;
        background: #397ed8;
      }
    }
  }

  .bottom {
    width: 100%;
    background: #25282c;
    overflow: hidden;
    padding-bottom: 30px;
    .footer-box {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .footer-content {
        h3 {
          margin: 40px 0;
        }
        color: #fff;
        width: 300px;
        float: left;
        li {
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
