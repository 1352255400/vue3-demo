// 动态拼接语言包
let defaultLang: object = {};
const files = import.meta.globEager('./en/**/*.ts');
Object.keys(files).forEach(fileName => {
  defaultLang = Object.assign(defaultLang, files[fileName].default);
});
export default defaultLang;
