<script setup>
/*-----------------------------------------搜索文章列表---------------------------------------*/
// 文章列表数据
import {onMounted, ref} from "vue";
import {articleListApi} from "../../api/article";

const articles = ref([
  {id: 1, title: '文章标题1', content: '文章内容1', createdTime: '2024-02-20', author: 'John Doe'},
  {id: 2, title: '文章标题2', content: '文章内容2', createdTime: '2024-02-18', author: 'Jane Smith'},
  {id: 3, title: '文章标题3', content: '文章内容3', createdTime: '2024-02-15', author: 'Alice Johnson'},
]);

const searchList = async () => {
  // 在这里执行搜索操作，例如从服务器获取数
  const res = await articleListApi();
  articles.value = res.data.item;
};
onMounted(() => {
  // 在这里执行初始化操作，例如从服务器获取数据
  searchList();
});
</script>
<template>
  <!-- ----------------------------------------面包屑---------------------------------------------- -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--文章列表-->
  <el-table :data="articles">
    <el-table-column prop="id" lable="文章id"></el-table-column>
    <el-table-column prop="title" lable="文章标题"></el-table-column>
    <el-table-column prop="content" lable="文章内容"></el-table-column>
    <el-table-column prop="createdTime" lable="创建时间"></el-table-column>
    <el-table-column prop="author" lable="作者"></el-table-column>
    <el-table-column lable="操作">
      <template #default="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped>
</style>