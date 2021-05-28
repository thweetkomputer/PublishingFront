<template>
    <div id="search" >
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
      input: '红楼梦',
      ridio:'0'
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
  .el-radio {
    color: black;
    cursor: pointer;
    margin-left: 0px;
}
/* .el-radio__input.is-checked+.el-radio__label {
    color: red;
    
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: red;
    background: red;
} */

</style>