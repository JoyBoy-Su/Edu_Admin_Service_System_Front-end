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
    var strength = 0;
    var check = true;
    if (/\d+/.test(str)) strength++;
    if (/[a-zA-z]+/.test(str)) strength++;
    if (/[-_]+/.test(str)) strength++;
    if (strength < 2) check = false;
    return check;
}