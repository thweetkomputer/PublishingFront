<template>
    <div id="search" >
      <div >
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-input class="SearchInput" v-model="input"/>
        <el-button icon="el-icon-search" circle style="margin-left: -300px;" @click="getSearchContent"></el-button>

        <ul class="SearchLevel" style="margin-left: 300px;color:black">
        <span>搜索选项:</span>
        <el-radio class="radio" v-model="ridio" label="1" style="margin-left: 10px">按文章名搜索</el-radio>
        <el-radio class="radio" v-model="ridio" label="2">按标签搜索</el-radio>
          <el-radio class="radio" v-model="ridio" label="3">按作者名搜索</el-radio>
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
                        @click="toArticle(item.id)"
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
import axios from "axios";

export default {
  name: "search",
   data() {
     const query = this.$route.query;
    return {
      input: query.searchContent,
      ridio:'1',
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      article_list: [],
      total_num:0,
      value:false
    }
  },
  mounted() {
    this.getSearchAticleName();
  },
  computed: {
    isSearch() {
      return this.isFocus;
    }
  },
  methods:{
    getSearchContent(){
      if(this.label===1){
        this.getSearchAticleName();
      }
      else if(this.label===2){
        this.getSearchAticleTag();
      }
      else if(this.label===3){
        this.getSearchAticleAuthor();
      }
    },
    getSearchAticleName(){
      console.log(this.input);
      axios({
        url: "/searchByKeyword",
        method: "get",
        params: {
          input:this.input,
          page:this.currentPage,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list=res.data.data;
        this.total=res.data.data.total_num;
        console.log(this.total)
      });
    },
    getSearchAticleTag(){
      console.log(this.input);
      axios({
        url: "/searchByTag",
        method: "get",
        params: {
          input:this.input,
          page:this.currentPage,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list=res.data.data;
        this.total=res.data.data.total_num;
        console.log(this.total)
      });
    },
    getSearchAticleAuthor(){
      console.log(this.input);
      axios({
        url: "/searchByWriter",
        method: "get",
        params: {
          input:this.input,
          page:this.currentPage,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list=res.data.data;
        this.total=res.data.data.total_num;
        console.log(this.total)
      });
    },
    toArticle(id){
      this.$router.push({path:'/content',query:{id:id}})
    },
    getListData(page) {
      axios({
        url: "/newPassages",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total_num=res.data.data.total_num;
        if(this.total_num%10!==0){
          this.total=this.total_num/10+1;
        }
        else{
          this.total=this.total_num/10;
        }
        console.log(this.total)
      });
    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getListData(val);
    },
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