<template>
  <div>
    <!-- 只读模式 :previewOnly="true" -->
    <!-- :sanitize="sanitize" 使用会导致代码不高亮 -->
    <MdEditor :toolbarsExclude="['github', 'save']"
              v-model="newValue"
              :language="language"
              @onUploadImg="onUploadImg"
              :style="height"
              @onChange="onChange">
    </MdEditor>
  </div>
</template>


<script lang="ts" setup>
// import { shareCodeApi, onUploadImg } from '../util/api'
import { reactive, ref, toRefs, watch, onMounted } from 'vue';

import { fileCos } from '@/utils/upload';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'my-lang': {
        toolbarTips: {
          bold: '加粗',
          underline: '下划线',
          italic: '斜体',
          strikeThrough: '删除线',
          title: '标题',
          sub: '下标',
          sup: '上标',
          quote: '引用',
          unorderedList: '无序列表',
          orderedList: '有序列表',
          codeRow: '行内代码',
          code: '块级代码',
          link: '链接',
          image: '图片',
          table: '表格',
          mermaid: 'mermaid图',
          katex: '公式',
          revoke: '后退',
          next: '前进',
          save: '保存',
          prettier: '美化',
          pageFullscreen: '浏览器全屏',
          fullscreen: '屏幕全屏',
          preview: '预览',
          htmlPreview: 'html代码预览',
          catalog: '目录',
          github: '源码地址'
        },
        titleItem: {
          h1: '一级标题',
          h2: '二级标题',
          h3: '三级标题',
          h4: '四级标题',
          h5: '五级标题',
          h6: '六级标题'
        },
        imgTitleItem: {
          link: '添加链接',
          upload: '上传图片',
          clip2upload: '裁剪上传'
        },
        linkModalTips: {
          title: '添加',
          descLable: '链接描述：',
          descLablePlaceHolder: '请输入描述...',
          urlLable: '链接地址：',
          UrlLablePlaceHolder: '请输入链接...',
          buttonOK: '确定'
        },
        clipModalTips: {
          title: '裁剪图片上传',
          buttonUpload: '上传'
        },
        copyCode: {
          text: '复制代码',
          successTips: '已复制！',
          failTips: '复制失败！'
        },
        mermaid: {
          flow: '流程图',
          sequence: '时序图',
          gantt: '甘特图',
          class: '类图',
          state: '状态图',
          pie: '饼图',
          relationship: '关系图',
          journey: '旅程图'
        },
        katex: {
          inline: '行内公式',
          block: '块级公式'
        },
        footer: {
          markdownTotal: '字数',
          scrollAuto: '同步滚动'
        }
      }
    }
  }
});

// 初始化表单数据
const state = reactive({
  height: '',
  newValue: '' as string,
  language: 'my-lang',
  toobars: [
    'bold',
    'underline',
    'italic',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'revoke',
    'next',
    'save',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'htmlPreview'
  ],
  toolbarsExclude: ['github', 'save']
});
// 初始化表单数据
const { newValue, height, toolbarsExclude, toobars, language } = toRefs(state);

// ......上面这些是多语言配置，如果用不到切换语言请忽略 ......
interface Props {
  modelValue: string;
  height?: number; // 编辑器的高度
  placeholder?: string;
}
interface EmitEvent {
  (e: 'update:modelValue', params: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  height: 0,
  placeholder: '请输入内容'
});
const emit = defineEmits<EmitEvent>();
// 启动事件
onMounted(() => {
  state.height =
    'min-height:' +
    (document.documentElement.clientHeight - props.height) +
    'px';
  //   console.log(666, props.modelValue);
});

// watch监听ref声明属性的变化
watch(props, newProps => {
  state.newValue = newProps.modelValue;
  //if(state.newValue) state.height = ''
});
// const newValue = props.modelValue;

// 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
const onChange = (text: string, html: string) => {
  // console.log(JSON.stringify(text));
  //   console.log(html);
  // 如果有需要这些值，可以传回给父组件
  emit('update:modelValue', text);
};

// 图片上传
async function onUploadImg(
  files: FileList,
  callback: (urls: string[]) => void
) {
  const res = await Promise.all(
    Array.from(files).map(file => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('img', file);
        console.log(file);
        fileCos(file).then((res: any) => {
          if (res.data.statusCode === 200) {
            rev(res);
          } else {
            console.log('上传失败');
          }
        });
      });
    })
  );

  callback(res.map((item: any) => 'https://' + item.data.Location));
}
</script>
