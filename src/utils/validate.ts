/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * 验证手机号
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(str: string) {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(str);
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email: string) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} pwd
 * @returns {Boolean}
 */
export function validPwd(pwd: string) {
  // 必须包含大小写和数字
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.@$!%*?&]{6,18}$/;
  // 必须包含大小写和数字 和特殊字符
  // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{6,18}$/
  return reg.test(pwd);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: string) {
  if (typeof str === 'string') {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: any) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

// 检查图片格式（isImage('xxxx.jpeg')）
export function isImage(fileName: string) {
  if (typeof fileName !== 'string') return;
  const name = fileName.toLowerCase();
  return (
    name.endsWith('.png') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.jpg') ||
    name.endsWith('.png') ||
    name.endsWith('.bmp')
  );
}

// 检查图片格式（checkType('xxxx.jpeg',"png|jpeg|jpg|bmp")）
export function checkType(fileType: string, typeList: string) {
  // 检查类型
  if (typeof fileType !== 'string') return;

  let re = false as boolean;
  const name = fileType.toLowerCase();
  const list = typeList.split('|');
  list.some(function (v) {
    if (name.endsWith('.' + v)) {
      console.log('类型验证成功');
      re = true;
      return true;
    }
  });

  return re;
}

// 检查大小
export function maxSize(fileSize: number, size: number) {
  // 检查类型
  //   if (typeof fileSize !== 'number' || typeof size !== 'number') return
  return fileSize / 1024 / 1024 < size;
}

// 获取文件后缀
export function getFileSuffix(fileName: string) {
  // 检查类型
  if (typeof fileName !== 'string') return;

  const arr = fileName.split('.') as string[];
  const name = arr[arr.length - 1].toLowerCase() as string;
  return name;
}

// 获取文件后缀
export function endWith(str: string, endStr: string) {
  const d = (str.length - endStr.length) as any;
  return d >= 0 && str.lastIndexOf(endStr) == d;
}
