<template>
    <div class="login-container">
        <el-form ref="loginForm" 
            :model="form"  
        >
            <div class="title-container">
                <img src = "../assets/img/fudanlogo.jpg" id = "logo-img">
                <h2 id = "login-title">统一身份认证</h2>
            </div>

            <el-form-item prop="schoolNumber">
                <el-input
                    ref="schoolNumber"
                    placeholder="用户名（本人学工号）"
                    name="schoolNumber"
                    type="text"
                    v-model="form.schoolNumber"
                    @focus = "inputNumber"
                    @blur = "checkNumber"
                />
                <div id = "numberMsg" class = "msg"> {{numberMsg}} </div>
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                </span>
                <el-input
                    ref="password"
                    v-model="form.password"
                    placeholder="用户密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    show-password
                />
            </el-form-item>

            <el-button 
                type="primary" 
                style="width:100%;margin-bottom:30px;" 
            >
            Login
            </el-button>

            <div id = "loginMsg" class = "msg"> {{loginMsg}} </div>

        </el-form>
    </div>
</template>

<script>
    export default {
        name : "Login",
        data() {
            return {
                form : {
                    schoolNumber : "",
                    password : "",
                },
                numberMsg : "",
                loginMsg : ""
            };
        },
        methods: {
            inputNumber() {
                this.numberMsg = "";
            },
            checkNumber() {
                
            }
        }
    };
</script>

<style scoped>

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

.title-container {
    float: left;
    width: 288px;
    margin-top: 12px;
    margin-left: 40%;
    margin-right: 40%;
    margin-bottom: 10px;
}

.msg {
    color: red;
    margin-left: 10px;
}

</style>