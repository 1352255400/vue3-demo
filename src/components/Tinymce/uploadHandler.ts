import { compressAccurately } from 'image-conversion';
// import { upload } from '@api/upload'

export const filePickerCallback = (callback: any, value: any, meta: any) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.onchange = function () {
    // const file = this.files[0] as any;

    const reader = new FileReader();
    reader.onload = function () {
        console.log("上传");
        
      const id = 'blobid' + new Date().getTime();
    //   const blobCache = tinymce.activeEditor.editorUpload.blobCache;
    //   const base64 = reader.result.split(',')[1];
    //   const blobInfo = blobCache.create(id, file, base64);
    //   blobCache.add(blobInfo);
      /* call the callback and populate the Title field with the file name */
    //   callback(blobInfo.blobUri(), { title: file.name });
    };

    // reader.readAsDataURL(file);
  };

  input.click();
};

const uploadImage = (formData: any, successFun: any, failureFun: any) => {
    console.log("上传");
  //   upload(formData)
  //     .then(res => {
  //       const fileSrc = import.meta.env.VITE_APP_REAL_API + res.data.path
  //       successFun(fileSrc)
  //     })
  //     .catch(err => {
  //       failureFun(err)
  //     })
};

export const uploadHandler = (
  blobInfo: any,
  successFun: any,
  failureFun: any,
  progressFun: any
) => {
  const file = blobInfo.blob() as any; // 转化为易于理解的file对象

  const formData = new FormData();
  if (file.size / 1024 > 200) {
    // 如果大于 200k 压缩一下
    compressAccurately(file, 100).then(resBlob => {
      formData.append('avatar', resBlob, file.name);
      uploadImage(formData, successFun, failureFun);
    });
  } else {
    formData.append('avatar', file, file.name);
    uploadImage(formData, successFun, failureFun);
  }
};

export const imageUploadHandler = (
  blobInfo: any,
  successFun: any,
  failureFun: any,
  progressFun: any
) => {
  let xhr: any, formData: any;
  const file = blobInfo.blob();

//   xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', import.meta.env.VITE_APP_BASE_API + '/admin/single/upload');

  xhr.upload.onprogress = function (e:any) {
    progressFun((e.loaded / e.total) * 100);
  };

  xhr.onload = function () {
    let json: any;
    if (xhr.status === 403) {
      failureFun('HTTP Error: ' + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failureFun('HTTP Error: ' + xhr.status);
      return;
    }
    // json = JSON.parse(xhr.responseText);
    if (!json || typeof json.data.url !== 'string') {
      failureFun('Invalid JSON: ' + xhr.responseText);
      return;
    }
    let fileSrc = json.data.path;
    fileSrc = import.meta.env.VITE_APP_REAL_API + fileSrc;
    successFun(fileSrc);
  };

  xhr.onerror = function () {
    failureFun(
      'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
    );
  };
//   formData = new FormData();
  formData.append('avatar', file, file.name);

  xhr.send(formData);
};
