<template>
    <div id="search" >
        <p v-html="websiteTag"></p>
        <el-input class="SearchInput" v-model="input"/>
        <el-button icon="el-icon-search" circle style="margin-left: -300px;"></el-button>

        <ul class="SearchLevel" style="margin-left: 300px;color:black">
        <span>搜索选项:</span>
        <el-radio class="radio" v-model="ridio" label="0" style="margin-left:10px">全部</el-radio>
        <el-radio class="radio" v-model="ridio" label="1">按文章名搜索</el-radio>
        <el-radio class="radio" v-model="ridio" label="2">按标签搜索</el-radio>
        </ul>
    </div>
    

</template>

<script>
export default {
  name: "search",
   data() {
        return {
            websiteTag: '<a href="C:\\Users\\wangc\\Desktop\\foto-master\\foto-master\index.html">taobao</a>'
        }
    },
  computed: {
    isSearch() {
      return this.isFocus;
    }
  }


}
</script>

<style>
  .SearchInput {
    display: inline-block;
    max-width: 300px;
    min-width: 100px;
    padding: 20px 0px;
    margin: 10px 320px;
  }

</style>