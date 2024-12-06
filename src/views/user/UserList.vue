<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {getUserListApi, userPageApi} from "../../api/user";

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
</template>