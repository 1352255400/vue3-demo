import { strLength } from '@/utils/common';

export const getmark = () => {
  const setWatermark = (str: any, str1: any) => {
    const id = '1.23452384164.123412416';
    if (document.getElementById(id) !== null) {
      document.body.removeChild(document.getElementById(id)!);
    }

    // 计算字符串长度
    const width =
      strLength(str) > strLength(str1) ? strLength(str) : strLength(str1);

    // 1.初始化图片 创建一个画布
    const can = document.createElement('canvas');
    //设置画布的长宽
    can.width = width * 10 + 100;
    can.height = 150;

    const cans = can.getContext('2d')!;
    //旋转角度
    cans.rotate((-25 * Math.PI) / 180);
    // 填充背景色
    // cans.fillStyle = '#ccc';
    // cans.fillRect(10, 10, width * 10 + 100, 150);

    cans.font = '14px Arial';
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200,  0.35)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    //设置在绘制文本时使用的当前文本基线
    // cans.textBaseline = "Middle";
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, 10, can.height / 2 + 18);
    cans.font = '14px Arial';
    cans.fillText(' ' + str1, 10, can.height / 2 + 45);

    const div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '30px';
    div.style.left = '0px';
    div.style.position = 'fixed';
    div.style.zIndex = '100000';
    div.style.width = document.documentElement.clientWidth + 'px';
    div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background =
      'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id;
  };

  // 该方法只允许调用一次
  const watermark = (str: string, str1: string) => {
    let id = setWatermark(str, str1);
    setInterval(() => {
      if (document.getElementById(id) === null) {
        id = setWatermark(str, str1);
      }
    }, 500);
    window.onresize = () => {
      setWatermark(str, str1);
    };
  };
  return { watermark };
};
