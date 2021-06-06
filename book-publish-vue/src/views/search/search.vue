<template>
    <div id="search" >
      <div >
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-input class="SearchInput" v-model="input"/>
        <el-button icon="el-icon-search" circle style="margin-left: -300px;"></el-button>

        <ul class="SearchLevel" style="margin-left: 300px;color:black">
        <span>搜索选项:</span>
        <el-radio class="radio" v-model="ridio" label="0" style="margin-left:10px">全部</el-radio>
        <el-radio class="radio" v-model="ridio" label="1">按文章名搜索</el-radio>
        <el-radio class="radio" v-model="ridio" label="2">按标签搜索</el-radio>
        </ul>
      <div class="article" style="color: #00000060;width: 80%;float: left">
        <el-row>
          <el-col v-for="item in article_list" :key="item.id" :span="24">
            <div class="card dewb">
              <el-row>
                <el-col :xs="24" :lg="18">
                  <div>{{ item.title }}</div>
                  <div> {{ item.description }} </div>
                  <div>
                    <el-button
                        @click="toArticle(item.title)"
                        type="success"
                        icon="el-icon-search"
                        circle
                        style="margin: 10px"
                    ></el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: "search",
   data() {
    return {
      input: '',
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

</style>