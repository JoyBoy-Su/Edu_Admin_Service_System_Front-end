<template>
  <el-form
    :model="formInfo"
    status-icon
    :rules="formRules"
    ref="registerForm"
    label-width="100px"
    class="register-form"
  >
    <el-form-item label="用户名称" prop="username" required>
      <el-input
        v-model="formInfo.username"
        placeholder="请输入用户名称"
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item label="用户身份" prop="type" required>
      <el-radio-group
        v-model="formInfo.type"
        size="medium"
        style="width: 200px"
      >
        <el-radio-button label="教师"></el-radio-button>
        <el-radio-button label="学生"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="学工号" prop="schoolNumber" required>
      <el-input
        v-model="formInfo.schoolNumber"
        placeholder="请输入学工号"
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item label="学院" prop="institute" required>
      <el-select
        v-model="formInfo.institute"
        filterable
        placeholder="请选择学院"
      >
        <el-option
          v-for="institute in institutes"
          :key="institute.id"
          :label="institute.name"
          :value="institute.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="专业" prop="major" required>
      <el-select v-model="formInfo.major" filterable placeholder="请选择专业">
        <el-option v-for="major in majors" :key="major.id" :value="major.name">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="身份证号" prop="ID" required>
      <el-input
        v-model="formInfo.ID"
        placeholder="请输入身份证号"
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item label="电话号码" prop="telephone">
      <el-input
        v-model="formInfo.telephone"
        placeholder="请输入电话号码"
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item label="电子邮箱" prop="email">
      <el-input
        v-model="formInfo.email"
        placeholder="请输入电子邮箱"
        style="width: 400px"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')"
        >注册</el-button
      >
      <el-button @click="resetForm('registerForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  validUsername,
  validID,
  validTelephone,
  validEmail,
} from "../utils/validate";
import instituteInfo from "../assets/json/institute.json";
import { register } from "../api/user";
export default {
  name: "Register",
  data() {
    // 用户名称校验
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("用户名称格式有误!"));
      } else {
        callback();
      }
    };
    // 用户学工号校验
    const validateSchoolNumber = (rule, value, callback) => {
      if (this.formInfo.type === "") {
        callback(new Error("请先选择用户身份!"));
      } else {
        const schoolNumberReg =
          this.formInfo.type === "教师" ? /^\d{8}$/ : /^\d{6}$/;
        if (!schoolNumberReg.test(value)) {
          callback(new Error("学工号格式有误!"));
        } else {
          callback();
        }
      }
    };
    // 身份证号校验
    const validateID = (rule, value, callback) => {
      if (!validID(value)) {
        callback(new Error("身份证号格式有误!"));
      } else {
        callback();
      }
    };
    // 电话号码校验
    const validateTelephone = (rule, value, callback) => {
      if (!validTelephone(value)) {
        callback(new Error("电话号码格式有误!"));
      } else {
        callback();
      }
    };
    // 电子邮箱校验
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("电子邮箱格式有误!"));
      } else {
        callback();
      }
    };
    return {
      formInfo: {
        username: "",
        type: "",
        schoolNumber: "",
        institute: "",
        major: "",
        ID: "",
        telephone: "",
        email: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择用户身份", trigger: "change" },
        ],
        schoolNumber: [
          { required: true, message: "请输入学工号", trigger: "blur" },
          { validator: validateSchoolNumber, trigger: "blur" },
        ],
        institute: [
          { required: true, message: "请选择学院", trigger: "change" },
        ],
        major: [{ required: true, message: "请选择专业", trigger: "change" }],
        ID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: validateID, trigger: "blur" },
        ],
        telephone: [{ validator: validateTelephone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  computed: {
    username() {
      return this.formInfo.username;
    },
    type() {
      if (this.formInfo.type === "") return "";
      return this.formInfo.type === "教师" ? "teacher" : "student";
    },
    schoolNumber() {
      return this.formInfo.schoolNumber;
    },
    institute() {
      if (this.formInfo.institute === "") {
        // 如果还没有选择学院
        return "";
      }
      return this.institutes[this.formInfo.institute].name;
    },
    major() {
      return this.formInfo.major;
    },
    ID() {
      return this.formInfo.ID;
    },
    telephone() {
      return this.formInfo.telephone;
    },
    email() {
      return this.formInfo.email;
    },
    institutes() {
      return instituteInfo.institutes;
    },
    majors() {
      if (this.formInfo.institute === "") {
        // 如果还没有选择学院
        return [];
      }
      return this.institutes[this.formInfo.institute].major;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验完成发请求
          register({
            name: this.username,
            type: this.type,
            schoolNumber: this.schoolNumber,
            college: this.institute,
            specialty: this.major,
            ID: this.ID,
            telephone: this.formInfo.telephone,
            email: this.formInfo.email,
          })
            .then((res) => {
              // 请求响应成功
              if (res.data.success === "1") {
                // 注册成功
                this.$message.success("注册成功");
                this.resetForm("registerForm");
              } else {
                // 注册失败
                this.$message.error(
                  "注册失败！学工号" + this.formInfo.schoolNumber + "已注册"
                );
              }
            })
            .catch((err) => {
              // 请求响应失败
              this.$message.error("注册请求失败！" + err.message);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.register-form {
  width: 800px;
}
</style>