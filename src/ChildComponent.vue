<script  setup>
/*表格的数据*/
const tableData = [
  {
    name: 'Tom',
    age:18,
    email:"tom@gmail.com",
    sex:1
  },
  {
    name: 'Tom',
    age:18,
    email:"tom@gmail.com",
    sex:1
  },
  {
    name: 'Tom',
    age:18,
    email:"tom@gmail.com",
    sex:1
  },
  {
    name: 'Tom',
    age:18,
    email:"tom@gmail.com",
    sex:1
  },
]
// 分页的数据
import { ref } from 'vue'

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
</script>

<template>
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
  <el-pagination class="el-p"
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
.el-p {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
