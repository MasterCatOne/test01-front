<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from "element-plus";
import {registerApi} from "../api/user";
// 获取 Vue Router 实例
const router = useRouter();

//表单数据-对应userRegisterDTO对象
const formdata = ref({
  name: "zhangsan",
  email: "111@qq.com",
  pwd: "123456",
  age: "20",
  sex: 1,
});
//确认密码
const rePassword = ref("");
//注册方法
const handleFinish = () => {
  /*校验密码*/
  if (rePassword.value !== formdata.value.pwd) {
    ElMessage.error("两次密码不一致");
    return;
  }
  registerApi(formdata.value).then(res => {
    if (res.code === 0) {
      // 选择是否跳转到登陆页面
      ElMessage({
        message: res.message,
        type: "success",
        duration: 2000,
        onClose: () => {
          router.push("/login");
        }
      });
    }
  })
};
</script>
<template >
  <div class="flex h-screen justify-center items-center bg-orange-500">
    <el-card class="w-96">
      <!--卡片头-->
      <template #header>
        <div class="flex justify-center items-center">
          <el-icon color="#e76c19" size="30px">
            <ChromeFilled/>
          </el-icon>
          <el-text class="ml-2 text-xl">用户注册</el-text>
        </div>
      </template>
      <!--卡片内容-->
      <el-form>
        <el-form-item >
          <el-input placeholder="昵称" v-model="formdata.name" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入邮箱" v-model="formdata.email" clearable/>
        </el-form-item>
        <el-form-item >
          <el-input type="password" placeholder="请输入密码" v-model="formdata.pwd" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请再次输入密码" v-model="rePassword" clearable/>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入年龄" v-model="formdata.age" clearable/>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="formdata.sex" >
            <el-radio value="0">女</el-radio>
            <el-radio value="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFinish" class="w-full rounded-full">立即注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 跳转登录 -->
      <div class="flex justify-center">
        已有账号?
        <router-link class="text-blue-400" to="/login">立即登录</router-link>
      </div>
    </el-card>
  </div>
</template>