<template>
  <div>
    <MdEditor v-model="newValue"
              :previewOnly="true">
    </MdEditor>
  </div>
</template>


<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue';
// 应用插件
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

// 初始化表单数据
const state = reactive({
  newValue: '' as string
});
// 初始化表单数据
const { newValue } = toRefs(state);

// ......上面这些是多语言配置，如果用不到切换语言请忽略 ......
interface Props {
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {});
// watch监听ref声明属性的变化
watch(props, newProps => {
  state.newValue = newProps.modelValue;
});
</script>

