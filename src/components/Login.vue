<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      class="login-form"
      ref="loginForm"
      :model="formInfo"
      :rules="formRules"
    >
      <!-- 表头 -->
      <div class="title-container">
        <img src="../assets/img/logo.jpg" id="logo-img" />
        <h2 id="login-title">统一身份认证</h2>
      </div>

      <!-- 学工号 -->
      <el-form-item prop="schoolNumber">
        <el-input
          name="schoolNumber"
          ref="schoolNumber"
          placeholder="用户名（本人学工号）"
          type="text"
          prefix-icon="el-icon-user"
          v-model="formInfo.schoolNumber"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container"> </span>
        <el-input
          name="password"
          ref="password"
          placeholder="用户密码"
          type="password"
          prefix-icon="el-icon-lock"
          v-model="formInfo.password"
          show-password
        />
      </el-form-item>

      <!-- 登录 -->
      <el-button type="primary" @click="login('loginForm')"> 登录 </el-button>
    </el-form>
  </div>
</template>

<script>
import login from "../api/user";
import { validSchoolNumber } from "../utils/validate";
export default {
  name: "Login",
  data() {
    // 表单信息校验
    // school number校验
    const validateSchoolNumber = (rule, value, callback) => {
      if (!validSchoolNumber(value)) {
        callback(new Error("请输入正确格式的学工号"));
      } else {
        callback();
      }
    };
    // password校验
    const validatePassword = (rule, value, callback) => {
      if (!validPassward(value)) {
        callback(new Error("请输入正确格式的密码"));
      } else {
        callback();
      }
    };
    return {
      formInfo: {
        schoolNumber: "",
        password: "",
      },
      formRules: {
        schoolNumber: [{ validator: validateSchoolNumber, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 信息校验后通过发送登录请求
          login(this.formInfo).then((response) => {
            // 登录成功，保存用户信息，并跳转到主页
            if (response.data.success === "1") {
              this.$store.dispatch("user/login", {
                type: response.data.type,
                name: response.data.name,
                schoolNumber: this.formInfo.schoolNumber,
              });
              this.$router.push("/");
            } else {
              this.$message.error("密码错误!");
            }
          }).catch((err) => {
            // 请求失败
            this.$message.error("登录请求失败!");
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: url(../assets/img/fudan_background.png);
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.title-container {
  position: relative;
  float: left;
  width: 288px;
  margin-top: 12px;
  margin-left: 100px;
  margin-bottom: 20px;
}
.el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.el-button {
  width: 85%;
  margin-bottom: 30px;
}
#logo-img {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 5%;
}

#login-title {
  color: #0e419c;
  font-size: 24px;
  line-height: 10px;
}
</style>