
/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配数字，可以是小数，不可以是负数,可以为空
 * @param {*} s 
 */
export function isNumber(s){
  return  /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
export function isIntNumer(s){
  return  /(^-?\d+$)|(^$)/.test(s);
}
