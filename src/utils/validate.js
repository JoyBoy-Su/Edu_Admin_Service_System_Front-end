// 定义用到的校验信息函数
/**
 * @param {string} str
 * @returns {Boolean}
 * 校验学工号
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
 * 校验密码格式
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

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验用户名
 */
export function validUsername(str) {
    const usernameReg = /^[\u0391-\uFFE5A-Za-z]+$/;
    return usernameReg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验学号
 */
 export function validStudentNumber(str) {
    const studentReg = /^\d{6}$/;
    return studentReg.test(str) || teacherReg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验工号
 */
 export function validTeacherNumber(str) {
    const teacherReg = /^\d{8}$/;
    return teacherReg.test(str) || teacherReg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验身份证号
 */
export function validID(str) {
    const IDReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return IDReg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验电话号码
 */
export function validTelephone(str) {
    if(str === "") return true;
    const telephoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return telephoneReg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验电子邮箱
 */
export function validEmail(str) {
    if(str === "") return true;
    const emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return emailReg.test(str);
}