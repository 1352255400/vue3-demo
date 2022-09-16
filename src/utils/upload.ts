import api from '@/api/common'; // global css
import COS from 'cos-js-sdk-v5';

// 上传到cos
export function fileCos(_obj: any) {
  return new Promise((resolve, reject) => {
    const fileName = _obj.name ? _obj.name : 'face.png';
    const fileType = _obj.type ? _obj.type : 'image/png';
    const uid = _obj.uid ? _obj.uid : '6666';

    // 获取签名
    api
      .getCosSign({ name: fileName, type: fileType })
      .then((res: { data: any }) => {
        const data = res as any;
        // 获取cos令牌
        if (data.code == 0) {
          const cosArg = res.data.info;
          res.data = res.data.info.config;
          const cos = new COS({
            getAuthorization: function (options, callback) {
              callback({
                TmpSecretId:
                  res.data.credentials && res.data.credentials.tmpSecretId,
                TmpSecretKey:
                  res.data.credentials && res.data.credentials.tmpSecretKey,
                XCosSecurityToken:
                  res.data.credentials && res.data.credentials.sessionToken,
                ExpiredTime: res.data.expiredTime,
                StartTime: res.data.startTime
              });
            }
          });

          // 上传到cos
          const cosKey = `${
            cosArg.keyPrefix
          }/${new Date().getTime()}/${fileName}`;

          // 分片上传
          cos.uploadFile(
            {
              Bucket: cosArg.bucket,
              Region: cosArg.region,
              Key: cosKey,
              Body: _obj,
              // ChunkSize: 1024 * 1024 * 5, // 分片大小
              SliceSize: 1024 * 1024 * 100, // 大于5mb才进行分块上传
              onProgress: function (info) {
                // 进度
                const percent = Math.floor(info.percent * 10000) / 100;
                const speed =
                  Math.floor((info.speed / 1024 / 1024) * 100) / 100;
                console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
              }
            },
            function (err, data) {
              console.log('分片上传');
              console.log('上传' + (err ? '失败' : '完成'));
              resolve({
                err: err,
                data: data,
                uid: uid
              });
            }
          );
        } else {
          resolve({
            code: 1000,
            msg: '获取OSS签名失败'
          });
        }
      })
      .catch(error => {
        resolve({
          code: 1000,
          msg: '获取OSS签名失败' + error.msg
        });
      });
  });
}
