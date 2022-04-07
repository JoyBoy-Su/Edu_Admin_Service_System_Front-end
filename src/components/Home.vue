<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img id="logo-img" src="../assets/img/logo.jpg" />
        <span>教务管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边导航栏 -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
      <div class = "toggle-button" @click="toggleCollapse">|||</div>
        <!--菜单栏 -->
        <el-menu
          background-color="#9fcaf5"
          text-color="black"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!--一级菜单（菜单栏中最外层的元素）  -->
          <el-submenu
            :index="menu.id + ''"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <!-- 菜单模板区 -->
            <template slot="title">
              <!-- 菜单图标 -->
              <i :class="`el-icon-${menu.icon}`"></i>
              <!-- 菜单说明 -->
              <span>{{ menu.name }}</span>
            </template>

            <!-- 菜单的每一项内容 -->
            <el-menu-item
              :index="item.path"
              v-for="item in menu.children"
              :key="item.id"
            >
              <template slot="title">
                <!-- 菜单图标 -->
                <i :class="`el-icon-${item.icon}`"></i>
                <!-- 菜单说明 -->
                <span>{{item.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 内容主体展示 -->
      <el-main>
        <!-- 面包屑导航区 -->
        <!-- <Breadcrumb></Breadcrumb> -->
        <!-- 路由组件渲染位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuJson from "../assets/json/menu.json";
import Breadcrumb from "./Breadcrumb"

export default {
  name: "Home",

  created() {
    this.menuList = menuJson.admin;
    // menuJson.student
    // menuJson.teacher
  },
  components : {Breadcrumb},
  data() {
    return {
      // 该用户的菜单栏数据
      menuList: [],
      // 菜单栏是否折叠
      isCollapse: false
    };
  },
  methods: {
    logout() {
      // 清除用户登录信息
      this.$store.dispatch("user/logout");
      // 跳转到登录界面
      this.$router.push("/login");
    },
    toggleCollapse() {
      // 折叠菜单栏，即切换collapse的值
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style lang = "less" scoped>
.el-header {
  background-color: #409eff;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: beige;
  font-size: 25px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #9fcaf5;
  .em-menu {
    border-right: none;
  }
}


.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}

.toggle-button {
  background-color: #add1f5;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  color: #9b9da0;
}

#logo-img {
  width: 50px;
  height: 50px;
}
</style>