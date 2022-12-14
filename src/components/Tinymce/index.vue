<template>
  <div :class="{ fullscreen: fullscreen }"
       class="tinymce-container">
    <tinymce-editor :id="tinymceId"
                    initialValue="<p>Initial editor content</p>"
                    v-model="contentValue"
                    :init="initOptions"
                    :tinymceScriptSrc="tinymceSrc" />
    <div class="editor-custom-btn-container">
      <editor-image color="#4FC08D"
                    class="editor-upload-btn"
                    @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EditorImage from './components/EditorImage.vue';
import TinymceEditor from '@tinymce/tinymce-vue';
import { getTinymce } from '@tinymce/tinymce-vue/lib/es2015/main/ts/TinyMCE.js';
import { filePickerCallback, uploadHandler } from './uploadHandler';
import { menubar, plugins, toolbar } from './config';
// import { and } from '@vueuse/core';
import { localStorage } from '@/utils/storage';

export default defineComponent({
  name: 'Tinymce',
  components: { TinymceEditor, EditorImage },
  props: {
    tinymceId: {
      type: String,
      default: function () {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        );
      }
    },
    modelValue: {
      type: String,
      default: ''
    },
    toolbar: {
      type: [String, Array],
      // type: String || Number,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: 'file edit view insert format tools table tc help'
    },
    height: {
      type: [String, Number],
      required: false,
      default: 360
    },
    width: {
      type: [String, Number],
      required: false,
      default: 'auto'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const hasChange = ref(false);
    const hasInit = ref(false);
    const fullscreen = ref(false);

    const initOptions = ref({
      // base_url: '/tinymce',
      language: localStorage.get('language') == 'en' ? '' : 'zh_CN',
      // language_url: '/tinymce/langs/zh_CN.js',
      // skin_url: '/tinymce/skins/ui/animal',
      skin: 'oxide', // animal oxide
      //   content_css: 'animal',
      body_class: 'panel-body',
      height: props.height as string, // ????????????autoresize???????????????????????????
      min_height: props.height,
      // menubar: menubar,
      plugins: plugins,
      toolbar: toolbar,
      toolbar_sticky: true,
      toolbar_mode: 'wrap', // 'sliding'
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }, image: {max-width: 100%;}',
      branding: false, // tiny??????????????????????????????
      // resize: false,
      link_title: false,
      default_link_target: '_blank',
      convert_urls: false,
      end_container_on_empty_block: true,
      imagetools_cors_hosts: ['106.54.168.208:1016'],
      init_instance_callback: (editor: any) => {
        // tinymce ???????????????????????????
        // if (props.moduleValue: any) {
        //   editor.setContent(props.modelValue)
        // }
        hasInit.value = true;
        editor.on('NodeChange Change KeyUp SetContent', () => {
          hasChange.value = true;
          emit('update:modelValue', editor.getContent());
        });
      },
      image_title: true,
      // #?????? https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
      file_picker_callback: filePickerCallback, // ????????????????????????
      // images_upload_url: apiUrl + '/admin/single/upload',
      // #?????? https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
      images_upload_handler: uploadHandler, // ???????????????????????????
      setup: (editor: any) => {
        // tinymce ???????????????????????????
        editor.on('FullscreenStateChanged', (e: any) => {
          fullscreen.value = e.state;
        });
      }
    });

    const containerWidth = computed(() => {
      //   const width = props.width as string
      //   if (/^[\d]+(\.[\d]+)?$/.test(width)) {
      //     return `${width}px`
      //   }
      //   return width
    });

    const imageSuccessCBK = (arr: any[]) => {
      const tinymce = getTinymce().get(props.tinymceId);
      arr.forEach((v: any) => {
        tinymce.insertContent(`<img class="articlePic" src="${v.url}" >`);
      });
    };

    return {
      initOptions,
      hasChange,
      hasInit,
      fullscreen,
      containerWidth,
      imageSuccessCBK,
      contentValue: computed({
        get: () => props.modelValue,
        set: val => {
          emit('update:modelValue', val);
        }
      }),
      tinymceSrc: computed(() =>
        import.meta.env.VITE_APP_CDN_API
          ? import.meta.env.VITE_APP_CDN_API + 'tinymce/tinymce.min.js'
          : import.meta.env.VITE_APP_BASE + '/tinymce/tinymce.min.js'
      )
      // tinymceSrc: computed(() => '/tinymce/tinymce.min.js'),
    };
  }
});
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container :deep(.mce-fullscreen) {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 6px;
  top: 4px;
  z-index: 1001;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
