<script setup>
/*-----------------------------------------搜索文章列表---------------------------------------*/
// 文章列表数据
import {onMounted, reactive, ref} from "vue";
import {articleListApi, userUpdateApi} from "../../api/article";
import {ElMessage} from "element-plus";

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
/*-----------------------------------------编辑文章---------------------------------------*/
const editDialogVisible = ref(false);// 控制编辑对话框的显示/隐藏
// 编辑文章的数据对象
const editArticleData = reactive({
  id: '',
  title: '',
  content: '',
  author: ''
});
// 显示编辑对话框，传入要编辑的文章对象
const editArticle = (article) => {
  editDialogVisible.value = true;// 显示弹窗
  editArticleData.id = article.id;// 文章ID
  editArticleData.title = article.title;// 文章标题
  editArticleData.content = article.content;// 文章内容
  editArticleData.author = article.author;// 作者
};
//提交编辑
const submitEdit = async () => {
  editDialogVisible.value = false;//隐藏弹窗
  const res = await userUpdateApi(editArticleData);//调用编辑api
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '文章编辑成功'
    });
    await searchList();// 刷新列表数据
  }
};
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
        <el-button type="primary" size="mini" @click="editArticle(scope.row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- ----------------------------------------编辑文章区域----------------------------------------- -->
  <el-dialog v-model="editDialogVisible" title="编辑文章" width="500">
    <el-form label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="editArticleData.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" :rows="6" placeholder="请输入文章内容" v-model="editArticleData.content"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="editArticleData.author"></el-input>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </span>
  </el-dialog>
</template>

<style scoped>
</style>