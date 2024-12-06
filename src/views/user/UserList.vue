<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {onMounted, ref, toRaw} from 'vue'
import {getUserListApi, userAddApi, userDelApi, userPageApi, userUpdateApi} from "../../api/user";
import {ElMessage, ElMessageBox} from "element-plus";

/*-----------------------------------------搜索功能---------------------------------------*/
// 搜索参数
const searchParam = ref({
  currentPage: 1,
  pageSize: 10,
  email: "",
  name: "",
  age: "",
})
// 用户列表
const userList = ref([
  {id: 1, name: '张三', email: 'zhangsan@qq.com', age: 18, sex: '男'},
  {id: 2, name: '李四', email: 'lisi@qq.com', age: 19, sex: '女'},
  {id: 3, name: '王五', email: 'wangwu@qq.com', age: 20, sex: '男'},
])
const totalCount = ref(0);  // 一共有多少条记录
//分页查询列表
const searchList = () => {
  // 模拟请求数据
  userPageApi(searchParam.value).then(res => {
    userList.value = res.data.items.dataList;         // 使用 .value 更新 ref 的值
    totalCount.value = res.data.items.totalCount;     // 更新总记录数
  })
}
//组件挂载之后执行
onMounted(() => {
  searchList(); // 初始化时加载用户列表
})
/*-----------------------------------------表单校验---------------------------------------*/
const Rules = ref({
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
  ],
  pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 12, message: '密码长度在6-12位之间', trigger: 'blur'}
  ],
  age: [
    {required: true, message: '请输入年龄', trigger: 'blur'},
    {pattern: /^([1-9]|[1-8][0-9]|9[0-9])$/, message: '年龄范围必须在1-99之间', trigger: 'blur'}
  ],
  sex: [
    {required: true, message: '请选择性别', trigger: 'change'}
  ]
});

/*-----------------------------------------添加用户---------------------------------------*/
const addUserRef = ref(null); //添加用户表达引用名称
const addDialogVisible = ref(false);// 添加弹窗是否显示
//显示添加用户窗口
const addUser = async () => {
  addDialogVisible.value = true;          //显示添加用户弹窗
}
//添加用户数据
const addData = ref({
  name: '',
  email: '',
  pwd: '',
  age: null,
  sex: ''
});
//提交表单
const SubmitAddUser = async () => {
  await addUserRef.value.validate();            //校验表单
  const res = await userAddApi(addData.value);  //调用新增用户接口
  if (res.code === 0) {                         //新增成功
    ElMessage({
      message: res.message,         // 提示信息
      type: "success",              // 提示类型
    });
    addDialogVisible.value = false; // 隐藏弹窗
    // 清空数据
    addData.value = {
      name: '',
      email: '',
      age: null,
      sex: ''
    };
    await searchList();             // 重新加载用户列表
  }
};
/*-----------------------------------------编辑用户--------------------------------------*/
const editUserRef = ref(null);    //编辑表单引用名称
const editDialogVisible = ref(false)//编辑弹窗是否显示
//编辑表单数据
const formEditData = ref({
  id: '',
  name: '',
  email: '',
  age: null,
  sex: ''
});
//编辑用户方法 1。显示编辑窗口 2.回显数据
const editRow = (row) => {
  editDialogVisible.value = true;// 显示弹窗
  formEditData.value = JSON.parse(JSON.stringify(toRaw(row)));//使用深拷贝->避免修改原数据
};
// 提交编辑
const SubmitEditUser = async () => {
  await editUserRef.value.validate();//验证通过走下一行，
  const res = await userUpdateApi(formEditData.value);//调用编辑接口
  //响应码等于0接口返回成功
  if (res.code === 0) {
    ElMessage({
      type: "success",//提示框类型
      message: res.message,//提示信息
    });
    editDialogVisible.value = false;//隐藏弹窗
    await searchList(); // 重新加载用户列表
  }
};
/*-----------------------------------------删除用户---------------------------------------*/
//删除用户方法
const deleteRow = async (row) => {
  ElMessageBox.confirm(
      '确定要删除该用户吗？', // 提示信息
      '提示',// 提示框标题
      {
        confirmButtonText: '确定',// 确认按钮文字
        cancelButtonText: '取消',// 取消按钮文字
        type: 'warning'// 提示框类型
      }).then(async () => {
    const res = await userDelApi(row.id);   // 删除用户
    if (res.code === 0) { // 接口返回成功
      ElMessage({
        type: 'success',
        message: '用户删除成功'
      });
      await searchList();// 刷新列表数据
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除用户'
    });
  })
};
</script>

<template>
  <!-- ----------------------------------------面包屑---------------------------------------------- -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- ---------------------------------------搜索功能和添加功能------------------------------------- -->
  <div class="mt-5">
    <el-input v-model="searchParam.email" class="max-w-48" placeholder="输入邮箱"></el-input>
    <el-input v-model="searchParam.name" class="max-w-48" placeholder="输入昵称"></el-input>
    <el-input v-model="searchParam.age" class="max-w-48" placeholder="输入年龄">
      <template #append>
        <el-button @click="searchList">
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
      </template>
    </el-input>
    <el-button @click="addUser" class="ml-3" type="primary">新建用户</el-button>
  </div>
  <!-- ----------------------------------------用户列表------------------------------------- -->
  <el-table :data="userList" class="mt-2 w-full">
    <el-table-column prop="id" label="用户ID" width="180"/>
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="email" label="邮箱" width="180"/>
    <el-table-column prop="age" label="年龄" width="180"/>
    <el-table-column prop="sex" label="性别" width="180">
      <template #default="scope">
        <span v-if="scope.row.sex === 1">男</span>
        <span v-else-if="scope.row.sex === 0">女</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- --------------------------------------分页------------------------------------------ -->
  <el-pagination background layout="prev, pager, sizes, next, jumper, ->, total" class="mt-1"
                 v-model:currentPage="searchParam.currentPage"
                 v-model:page-size="searchParam.pageSize"
                 :page-sizes="[10, 20, 30, 40]"
                 :total="totalCount"
                 @current-change="searchList"
                 @size-change="searchList"
  />
  <!-- ----------------------------------------新增用户弹窗------------------------------------- -->
  <el-dialog v-model="addDialogVisible" title="新建用户" width="500">
    <!-- 表单 -->
    <el-form ref="addUserRef" :model="addData" :rules="Rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addData.name" placeholder="请输入用户名称"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addData.email" placeholder="请输入用户邮箱"/>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="addData.pwd" placeholder="请输入用户密码"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="addData.age" placeholder="请输入用户年龄"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="addData.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubmitAddUser()">提交</el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- ----------------------------------------编辑用户弹窗------------------------------------- -->
  <el-dialog v-model="editDialogVisible" title="编辑用户" width="500">
    <!-- 表单 -->
    <el-form ref="editUserRef" :model="formEditData" :rules="editRules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formEditData.name" placeholder="请输入用户名称"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formEditData.email" placeholder="请输入用户邮箱"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formEditData.age" placeholder="请输入用户年龄"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formEditData.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubmitEditUser()">提交</el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>