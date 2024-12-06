<script setup>
import {Avatar, UploadFilled} from "@element-plus/icons-vue";
import router from "../../router/router";
const loginOut = () => {
  //清除token
  localStorage.removeItem('token');
  //跳转路由
  router.push('/login');
}
</script>

<template>
  <el-container class="h-screen">
    <!--网站头部-->
    <el-header class="flex justify-between bg-orange-500">
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full" src="@/assets/logo.png">
        <h2 class="text-white ml-2">后台管理系统</h2>
      </div>
      <el-button @click="loginOut" type="primary" class="mt-3">退出</el-button>
    </el-header>
    <el-container>
      <!--侧边边栏-->
      <el-aside width="200px">
        <el-menu class="h-full" background-color="#f97316" text-color="#fff" :router="true">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Avatar/>
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">用户列表</el-menu-item>
            <el-menu-item index="/age">年龄画像</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <UploadFilled/>
              </el-icon>
              <span>文件管理</span>
            </template>
            <el-menu-item index="/child">文件列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main class="bg-transparent">
        <!-- router-view 显示内容 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>