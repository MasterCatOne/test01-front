<script setup>
import {ref} from "vue";
// 引入 Vue Router 实例
import {useRouter} from 'vue-router';
import {ChromeFilled} from "@element-plus/icons-vue";
import {loginApi} from "../api/user";
import {ElMessage} from "element-plus";
// 获取 Vue Router 实例
const router = useRouter();
const account = ref({
  email: '123456@qq.com',//账号
  pwd: '123456'//密码
});
// 调用登录接口
async function handleLogin() {
  //请求后台接口
  loginApi(account.value).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      const token = res.data.token;//得到token
      localStorage.setItem("token", token);  //将token存储到localStorage中
      router.push('/')//跳转首页
    }
  })
}
</script>
<template>
  <div class="flex h-screen justify-center items-center bg-orange-500">
    <el-card class="w-96">
      <!--卡片头-->
      <template #header>
        <div class="flex items-center justify-center">
          <el-icon color="#e76c19" size="30px">
            <ChromeFilled/>
          </el-icon>
          <el-text class="ml-2 text-xl">用户登陆</el-text>
        </div>
      </template>
      <el-form>
        <el-form-item>
          <el-input prefix-icon="UserFilled" placeholder="请输入账号" v-model="account.email" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="account.pwd" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full rounded-full" @click="handleLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
      <div class="flex justify-center">
        没有账号?
        <router-link class="text-blue-400" to="/register">立即注册</router-link>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
</style>