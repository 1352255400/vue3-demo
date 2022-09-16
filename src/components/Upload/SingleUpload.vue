<template>
  <div>
    <!-- 上传组件 -->
    <el-upload ref="singleUploadRef"
               class="single-uploader"
               :show-file-list="false"
               :http-request="uploadImage">
      <img v-if="imgUrl"
           :src="imgUrl"
           class="single-uploader__image" />
      <el-icon v-else
               class="single-uploader__plus">
        <Plus />
      </el-icon>

      <!-- 删除图标 -->
      <el-icon v-if="props.showClose && imgUrl"
               class="single-uploader__remove"
               @click.stop="handleRemove(imgUrl)">
        <Close />
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Close } from '@element-plus/icons-vue';
import {
  ElMessage,
  ElUpload,
  UploadRawFile,
  UploadRequestOptions
} from 'element-plus';
import { fileCos } from '@/utils/upload';
import { maxSize, checkType } from '@/utils/validate';
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  // 接收父组件传递的值
  maxSize: {
    type: Number,
    default: 5
  },
  // 接收父组件传递的值
  fileType: {
    // eslint-disable-next-line no-undef
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: 'png|jpg|gif'
  },
  /**
   * 是否显示右上角的删除图片按钮
   */
  showClose: {
    type: Boolean,
    default: false
  }
});

const imgUrl = computed<string | undefined>({
  get() {
    return props.modelValue;
  },
  set(val) {
    // imgUrl改变时触发修改父组件绑定的v-model的值
    emit('update:modelValue', val);
  }
});

/**
 * 自定义图片上传
 *
 * @param params
 */
async function uploadImage(options: UploadRequestOptions): Promise<any> {
  // 检查类型 ElMessage.warning('上传图片不能大于2M');
  if (
    props.fileType.length > 0 &&
    !checkType(options.file.name, props.fileType)
  ) {
    ElMessage.warning('附件格式不对：' + props.fileType);
    return false;
  }

  //   // 检查大小
  if (!maxSize(options.file.size, props.maxSize)) {
    ElMessage.warning(`附件大小不能超过${props.maxSize}M`);
    return false;
  }
  fileCos(options.file).then((res: any) => {
    if (res.data.statusCode === 200) {
      imgUrl.value = 'https://' + res.data.Location;
    } else {
      console.log('上传失败');
    }
  });
}

/**
 * 删除图片
 *
 * @param fileUrl
 */
function handleRemove(fileUrl?: string) {
  if (fileUrl) {
    // deleteFile(fileUrl);
    imgUrl.value = undefined; // 这里会触发imgUrl的computed的set方法
  }
}
</script>

<style lang="scss" scoped>
.single-uploader {
  width: 146px;
  height: 146px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  text-align: center;
  &:hover {
    border-color: var(--el-color-primary);
    .single-uploader__remove {
      display: inline;
    }
  }

  &__image {
    width: 146px;
    height: 146px;
    display: block;
  }

  &__plus {
    width: 146px;
    height: 157px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }

  &__remove {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    margin-top: 0px !important;
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
    display: none;
    &:hover {
      color: #ff4d51 !important;
    }
  }
}
</style>
