import useStore from '@/store';

/**
 * 获取uuid
 */
export function getUUID() {
  const r0x3: any = 'r&0x3';
  const x08: any = '0x8';
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : r0x3 | x08).toString(16);
  });
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(str: any) {
  const { permission } = useStore();
  console.log('按钮权限：' + str, permission.btnRoutes[str]);
  return permission.btnRoutes[str];
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(
  data: any,
  id = 'id' as string,
  pid = 'parentId' as string
) {
  const res = [];
  const temp = {} as any;
  for (let i = 0 as number; i < data.length; i++) {
    temp[data[i][id]] = data[i] as any;
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = [];
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1;
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]['children'].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataLevel(data: any, id = 'id', pid = 'parentId') {
  data.reverse();
  const res = [] as any;
  const temp = {} as any;
  data.forEach((val: { id: string | number }) => {
    temp[val.id] = val;
  });

  for (let k = 0; k < data.length; k++) {
    console.log(data[k].name);
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1;
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1;
      res.splice(data[k]);
    } else {
      res.splice(data[k]);
    }
  }
  return res;
}

/**
 * 转换文件大小
 */
export function fileSize(val: number) {
  if (val === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'PB', 'TB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(val) / Math.log(k));
  return (val / Math.pow(k, i)).toPrecision(3) + '' + sizes[i];
}

/**
 * 获取字符串长度
 */
export function strLength(str: string) {
  return str ? str.replace(/[\u0391-\uFFE5]/g, 'aa').length : 0;
}
