<!--富文本右上角自定义按钮上传组件-->
<template>
  <div class="upload-container">
    <el-button type="primary"
               @click="dialogVisible = true">
      {{$t('btn.upfile')}}
      <el-icon class="el-icon--right">
        <Upload />
      </el-icon>
    </el-button>
    <el-dialog v-model="dialogVisible">
      <el-upload name="photoSrc"
                 :http-request="uploadImage"
                 multiple
                 :file-list="fileList"
                 show-file-list
                 :on-remove="handleRemove"
                 class="editor-slide-upload"
                 list-type="picture-card">
        <el-icon class="single-uploader__plus">
          <Plus />
        </el-icon>

      </el-upload>
      <el-button @click="dialogVisible = false"> 取消 </el-button>
      <el-button type="primary"
                 @click="handleSubmit"> 确认 </el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import { ElMessage, UploadRequestOptions } from 'element-plus';
import { Delete, Plus, Upload } from '@element-plus/icons-vue';
import { fileCos } from '@/utils/upload';
import { maxSize, checkType } from '@/utils/validate';

const dialogVisible = ref(false);
const fileList = ref([]);

const emit = defineEmits(['successCBK']);
const state = reactive({ returnList: [] as any[] });
const { returnList } = toRefs(state);

// 保存
const handleSubmit = () => {
  emit('successCBK', state.returnList);
  state.returnList = [];
  fileList.value = [];
  dialogVisible.value = false;
};

// 移除图片
const handleRemove = (file: { uid: any }) => {
  const uid = file.uid;
  state.returnList.forEach((v, k) => {
    if (v.id == uid) {
      state.returnList.splice(k, 1);
      return;
    }
  });
};

/**
 * 自定义图片上传
 *
 * @param params
 */
async function uploadImage(options: UploadRequestOptions): Promise<any> {
  // 检查类型 ElMessage.warning('上传图片不能大于2M');
  //   if (
  //     props.fileType.length > 0 &&
  //     !checkType(options.file.name, props.fileType)
  //   ) {
  //     ElMessage.warning('附件格式不对：' + props.fileType);
  //     return false;
  //   }

  //   //   // 检查大小
  //   if (!maxSize(options.file.size, props.maxSize)) {
  //     ElMessage.warning(`附件大小不能超过${props.maxSize}M`);
  //     return false;
  //   }
  fileCos(options.file).then((res: any) => {
    if (res.data.statusCode === 200) {
      let fileSrc = 'https://' + res.data.Location;
      const uid = res.uid;
      state.returnList.push({ id: uid, url: fileSrc });
    } else {
      console.log('上传失败');
    }
  });
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  height: 200px;
  margin-bottom: 20px;
  :deep(.el-upload--picture-card) {
    li {
      width: 148px;
      height: 148px;
      float: left;
    }
  }
}
</style>
