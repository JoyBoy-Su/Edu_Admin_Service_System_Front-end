<template>
  <el-form
    :model="formInfo"
    :rules="formRules"
    :inline="true"
    ref="passwordForm"
    class="password-form"
    label-width="100px"
  >
    <!-- 身份信息 -->
    <el-form-item label="姓名" required>
      <el-input
        style="width: 180px"
        :disabled="true"
        :placeholder="formInfo.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="学工号" required>
      <el-input
        style="width: 180px"
        :disabled="true"
        :placeholder="formInfo.schoolNumber"
      ></el-input>
    </el-form-item>

    <!-- 原密码 -->
    <el-form-item label="原密码" prop="oldPassword" required>
      <el-input
        type="password"
        style="width: 470px"
        show-password
        v-model="formInfo.oldPassword"
      ></el-input>
    </el-form-item>
    <!-- 新密码 -->
    <el-form-item label="新密码" prop="newPassword" required>
      <el-input
        type="password"
        style="width: 470px"
        show-password
        v-model="formInfo.newPassword"
      ></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="confirmPassword" required>
      <el-input
        type="password"
        style="width: 470px"
        show-password
        v-model="formInfo.confirmPassword"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('passwordForm')">
        修改密码</el-button
      >
      <el-button @click="resetForm('passwordForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validPassward } from "../utils/validate";
import { changePassword } from "../api/user";
export default {
  name: "Password",
  data() {
    // 表单信息校验
    // new password校验
    const validatePassword = (rule, value, callback) => {
      if (!validPassward(value)) {
        callback(new Error("密码格式有误!"));
      } else {
        callback();
      }
    };
    // confirm password校验
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.formInfo.newPassword) {
        callback(new Error("两次密码输入不一致!"));
      } else {
        callback();
      }
    };
    return {
      formInfo: {
        name : this.$store.state.user.name,
        schoolNumber : this.$store.state.user.schoolNumber,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      formRules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 32, message: "密码长度应为6-32位", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword({
            schoolNumber: this.schoolNumber,
            oldPassword: this.formInfo.oldPassword,
            newPassword: this.formInfo.newPassword,
          })
            .then((response) => {
              // 成功修改
              this.$message.success("密码修改成功!");
            })
            .catch((error) => {
              this.$message.error("密码修改失败!" + error.message);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style scoped>
.password-form {
  width: 600px;
}
</style>