<template>
  <div class="app-container">
    <SingleUpload v-model="icon" />
    <!-- 选择图标 -->
    {{ iconSelectVisible}}
    <el-popover ref="popoverRef"
                placement="bottom-start"
                :width="570"
                trigger="click">
      <template #reference>
        <el-input v-model="icon"
                  placeholder="点击选择图标"
                  readonly
                  @click="iconSelectVisible = true">
          <template #prefix>
            <svg-icon :icon-class="icon" />
          </template>
        </el-input>
      </template>

      <icon-select @selected="selected" />
    </el-popover>
    <Tinymce :modelValue="content"></Tinymce>
  </div>
</template>

<script lang="ts">
export default {
  name: 'demo'
};
</script>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
// Vue依赖
import { onMounted, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue';
// 组件依赖
import {
  Search,
  Plus,
  Refresh,
  Delete,
  Download,
  Top,
  CaretTop,
  CaretBottom
} from '@element-plus/icons-vue';
// 组件事件
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';

// 富文本编辑器
import Tinymce from '@/components/Tinymce/index.vue';
import SingleUpload from '@/components/Upload/SingleUpload.vue';

//  reactive是Vue3中提供实现响应式数据的方法
const state = reactive({
  content: '' as string,
  icon: '',
  iconSelectVisible: false as boolean,
  // 列表高度
  tableHeight: '300px' as string,
  // 更多状态
  batchStatus: false as boolean,
  // 数据列表
  // 总数
  total: 0 as number,
  // 选中ID数组
  ids: [] as number[],
  // 非单个禁用
  single: true as boolean,
  loading: true as boolean,
  // 查询参数
  // 批量操作
  switchText: 0 as number,
  // 搜索框展开收起
  formClass: 'form-list' as string,
  searchText: 0 as number,
  labelPosition: 'right' as any,
  labelWidth: '100px' as string,
  updateTime: '' as string
});

const {
  content,
  icon,
  iconSelectVisible,
  // 列表高度
  tableHeight,
  // 更多状态
  batchStatus,
  // 数据列表
  // 总数
  total,
  // 选中ID数组
  ids,
  // 非单个禁用
  single,
  loading,
  // 查询参数
  // 批量操作
  switchText,
  // 搜索框展开收起
  formClass,
  searchText,
  labelPosition,
  labelWidth,
  updateTime
} = toRefs(state);

// 其他的生命周期
onBeforeMount(() => {
  state.tableHeight = document.documentElement.clientHeight - 328 + 'px';
});

onMounted(() => {
  // getDataList();
});

/**
 * 选择图标后事件
 */
function selected(name: string) {
  state.icon = name;
  state.iconSelectVisible = false;
}
</script>


<style lang="scss" scoped>
</style>
