import CryptoJS from 'crypto-js' // 引用AES源码js
//  npm install crypto-js
// 使用demo
// import AES from '@/utils/crypto'
// let aa = AES.encrypt(1231)
// console.log('加密', aa);
// console.log('解密', AES.decrypt(aa));

// 偏移向量
const iv = import.meta.env.VITE_APP_CRYPTO_IV
// 秘钥
const keyStr = import.meta.env.VITE_APP_CRYPTO_KEY

export default {
  // 随机生成指定数量的16进制key
  generatekey(num:number) {
    const library =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let key = ''
    for (let i = 0; i < num; i++) {
      const randomPoz = Math.floor(Math.random() * library.length)
      key += library.substring(randomPoz, randomPoz + 1)
    }
    return key
  },

  // 加密
  encrypt(word:any) {
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  // 解密
  decrypt(word:any) {
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
