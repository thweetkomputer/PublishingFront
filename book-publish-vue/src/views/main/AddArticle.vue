<template>
  <div id="add_article">
    <el-row :gutter="10">
      <el-col :xs='24' :lg="12">
        <div class="dewb">
          <el-form :label-position="'left'" label-width="80px" :model="article_info">
            <el-form-item label="文章标题">
              <el-input v-model="article_info.title"></el-input>
            </el-form-item>
            <el-form-item label="文章对象">
              <el-input v-model="article_info.describe"></el-input>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
      <el-col :xs='24' :lg="12">
        <div class="dewb">

        </div>
      </el-col>
      <el-col :xs='24' :lg="12">
        <div class="dewb">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data(){
    return{
      article_info:{
        title:'',
        describe:''
      }
    }
  }
}
</script>

<style scoped>
.dewb{
  height: 200px;
  padding: 20px 200px;
  display: flex;
  align-items: center;
}
.el-col{
  margin-top: 10px;
}
</style>