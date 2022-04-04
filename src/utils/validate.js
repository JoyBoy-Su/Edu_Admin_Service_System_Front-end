// 定义用到的工具类函数
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validSchoolNumber(str) {
    // 判断学工号是否符合标准
    const studentReg = /^\d{6}$/;
    const teacherReg = /^\d{8}$/;
    return studentReg.test(str) || teacherReg.test(str);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassward(str) {
    return true;
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }