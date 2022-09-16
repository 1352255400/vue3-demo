<template>
  <el-config-provider :locale="locale"
                      :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
// 导入vue组件
import { computed, onMounted, ref, watch, onUnmounted } from 'vue';
// 导入 Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

// 导入 store
import useStore from '@/store';

// 导入水印
import { getmark } from '@/utils/warterMark';
import { translate } from '@/utils/i18n';

const { watermark } = getmark();
const { app, user } = useStore();
const language = computed(() => app.language);
const size: any = computed(() => app.size);

const locale = ref();
onMounted(() => {
  // 设置水印
  setTimeout(() => {
    setWatermark();
  }, 500);
});
onUnmounted(() => {
  // 取消水印
  watermark('', '');
});

// 添加水印方法
function setWatermark() {
  const name = user.nickname;
  const companyName = translate('login.title');
  watermark(name, companyName);
}

watch(
  language,
  value => {
    locale.value = value == 'en' ? en : zhCn;
  },
  {
    // 初始化立即执行
    immediate: true
  }
);
</script>
