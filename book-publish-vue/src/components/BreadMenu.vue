<template>
  <div class="dewb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ page_name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadMenu",
  props:['page_name'],
  date(){
    return{

    }
  }
}
</script>

<style scoped>
.dewb{
  padding: 10px;
}
</style>