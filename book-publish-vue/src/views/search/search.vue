<template>
  <div>
    <Advertisement></Advertisement>
    <div id="search">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-input class="SearchInput" v-model="input" @keyup.enter.native="getSearchContent(1)"/>
      <el-button icon="el-icon-search" circle style="margin-left: -300px;" @click="getSearchContent(1)"></el-button>

      <ul class="SearchLevel" style="margin-left: 300px;color:black">
        <span>搜索选项:</span>
        <el-radio class="radio" v-model="ridio" label="1" style="margin-left: 10px">按文章名搜索</el-radio>
        <el-radio class="radio" v-model="ridio" label="2">按标签搜索</el-radio>
        <el-radio class="radio" v-model="ridio" label="3">按作者名搜索</el-radio>
      </ul>

      <div v-if="ridio==='2'">
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>

      <div class="article" style="color: #00000060;width: 60%;float: left">
        <el-row class="fudong">
          <el-col v-for="item in article_list" :key="item.id" :span="24" style="margin-bottom: 3px;">
            <div class="card dewb" style="height: 120px" @click="toArticle(item.id)">
              <el-row>
                <el-col :xs="24" :lg="18">
                  <div style="padding-left: 30px; padding-top: 10px">
                    <div class="word"><h2 style="display: inline">{{ item.title }}</h2><span
                        style="padding-left: 10px; padding-top: 15px; float: right">{{ item.type }}</span></div>
                    <hr>
                    <div class="word"> {{ item.description }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div v-show="this.total===0" style="text-align: center; font-size: 30px">抱歉，您搜索的文章不存在。</div>
        <el-pagination
            background
            :hide-on-single-page="value"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Advertisement from "@/components/Advertisement";

export default {
  name: "search",
  components: {Advertisement},
  data() {
    const query = this.$route.query;
    return {
      dynamicTags: ['历史'],
      inputVisible: false,
      inputValue: '',
      input: query.searchContent,
      ridio: '1',
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      article_list: [],
      total_num: 0,
      value: false
    }
  },
  mounted() {
    this.getSearchContent(1);
    var that = this;
    this.$on('demo', function (msg) {
      that.getSearchAticleName(msg)
    })
  },
  computed: {},
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getSearchContent(val) {
      if (this.ridio === '1') {
        this.getSearchAticleName(val);
      } else if (this.ridio === '2') {
        this.getSearchAticleTag(val);
      } else if (this.ridio === '3') {
        this.getSearchAticleAuthor(val);
      }
    },
    getSearchAticleName(val) {
      console.log(this.input);
      axios({
        url: "/searchByKeyword",
        method: "get",
        params: {
          input: this.input,
          page: val,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total = res.data.data.total_num;
        console.log(this.total)
      });
    },
    getSearchAticleTag(val) {
      this.input = null,
      console.log(this.input),
          axios({
            url: "/searchByTag",
            method: "get",
            params: {
              input: this.dynamicTags.toString(),
              page: val,
              pageSize: this.pageSize,
            },
          }).then((res) => {
            this.article_list = res.data.data.article_list;
            this.total = res.data.data.total_num;
            console.log(this.total)
          });
    },
    getSearchAticleAuthor(val) {
      console.log(this.input);
      axios({
        url: "/searchByWriter",
        method: "get",
        params: {
          input: this.input,
          page: val,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total = res.data.data.total_num;
        console.log(this.total)
      });
    },
    toArticle(id) {
      let routeUrl = this.$router.resolve({
        path: "/content",
        query: {id: id}
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push({path:'/content',query:{id:id}})
    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getSearchContent(val);
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

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.tag:hover{
  color: #409EFF!important;

}

.fudong :hover {
  background: #f7f7f7;
  border-radius: 5px;
  cursor:pointer
}

.word{
  color: black;
}
.word:hover{
  color: #265194!important;
}
</style>