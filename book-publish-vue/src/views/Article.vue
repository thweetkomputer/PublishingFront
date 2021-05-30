<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <div class="dewb" style="margin-top:10px">
      <el-row>
        <el-col v-for="item in article_list" :key="item.id" :span="24">
          <div class="card dewb">
            <el-row>
              <el-col :xs="24" :lg="18">
                <div>{{ item.title }}</div>
                <div> 作者：{{ item.nickName }} </div>
                <div>
                  <el-button
                      @click="toArticle(item.id)"
                      type="success"
                      icon="el-icon-search"
                      circle
                  ></el-button>
                  <el-button
                      @click="deleteArticle(item.id)"
                      type="danger"
                      icon="el-icon-delete"
                      circle
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
<!--    total绑定data中的total-->
    <div class="dweb" style="margin-top:10px">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  props: ["screenWidth"],
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100,
      //total是条目总数，
      article_list: [{title:'1',nickname:'2'}],
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    //跳转内容页
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
        // console.log(res.data);
        this.article_list = res.data.data;
        this.total = res.data.total;
      });
    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getListData(val);
    },
    //删除文章
    deleteArticle(id) {
      if (confirm("是否确定删除")) {
        let checkInfo = {
          contentType: "blog_article",
          permissions: ["delete"],
        };
        this.$store.dispatch("checkUserPerm", checkInfo).then((res) => {
          console.log(res);
          if (res) {
            axios({
              url: "",
              method: "delete",
              data: Qs.stringify({
                id,
              }),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }).then((res) => {
              console.log(res);
              this.getListData(this.currentPage);
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#article-list .dweb {
  padding: 10px 10px;
}
.card.dweb .text-item {
  color: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
