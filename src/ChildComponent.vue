<script  setup>
import {getUserListApi} from "./api/user.js";
/*表格的数据*/
const tableData = ref([
  {
    name: 'Tom',
    age:18,
    email:"tom@gmail.com",
    sex:1
  },
  {
    name: 'Tom2',
    age:19,
    email:"tom@gmail.com",
    sex:1
  },
])
// 分页的数据
import {onMounted, ref} from 'vue'

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (number) => {
  console.log(`current page: ${val}`)
}
/*表单数据*/
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  email:""
})

const onSubmit = () => {
  console.log('submit!')
}
const search=function (){
  getUserListApi().then((res)=>{
    tableData.value=res.data.item
  })
}
onMounted(
    search()
)
</script>

<template>
  <!--表单
-->
  <el-form :model="form" :inline="true" label-width="auto" style="max-width: 6000px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" clearable placeholder="请输入姓名"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" clearable placeholder="请输入邮箱"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
<!-- 表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="Name" width="100" />
    <el-table-column prop="age" label="Age" width="100" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="sex" label="Sex" >
      <template #default="scope">
        {{ scope.row.sex === 1 ? '男' : '女' }}
      </template>
    </el-table-column>
    <el-table-column align="left">
      <template #default="scope">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 分页 -->
  <el-pagination class="flex justify-center "
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />

</template>
<style scoped>
/*.el-p {*/
/*  margin-top: 10px;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*}*/
</style>
