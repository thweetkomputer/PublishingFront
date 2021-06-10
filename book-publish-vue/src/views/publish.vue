<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="Books">
      <div id="content" style="margin-left: 0px;margin-top: -70px">
        <!--      margin-top可以选择不用-->
        <div class="article" style="color: #00000060;width: 80%;float: left">
          <el-row class="fudong">
            <el-col v-for="item in article_list" :key="item.id" :span="24" style="margin-bottom: 3px;">
              <div class="card dewb" style="height: 120px" @click="toArticle(item.id)">
                <el-row>
                  <el-col :xs="24" :lg="18">
                    <div style="padding-left: 30px; padding-top: 10px">
                      <div class="word"><h2 style="display: inline">{{ item.title}}</h2><span style="padding-left: 10px; padding-top: 15px; float: right">{{item.type}}</span></div>
                      <hr>
                      <div class="word"> {{ item.description }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-pagination
              background
              :hide-on-single-page="value"
              layout="prev, pager, next"
              :total="total_num"
              :page-size="pageSize"
              @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["screenWidth"],
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      article_list: [{}],
      total_num:0,
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    toArticle(id){
      let routeUrl = this.$router.resolve({
        path: "/publishcontent",
        query: {id:id}
      });
      window.open(routeUrl.href, '_blank');
    },
    //跳转内容页
    getListData(page) {
      axios({
        url: "/getPassageReviewedUnpublished",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total_num=res.data.data.total_num;
        this.LabelList=res.data.data.ReaderId;   //这个是不对的，我要获得所有的审稿人信息。
      });

    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getListData(val);
    },
  },
};
</script>
<style scoped>
.el-row {
  padding-bottom: 5px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-tag.el-tag--info {
  margin: 5px;
}

.el-tag.el-tag--info {
  background-color: #00000060;
  border-color: #00000060;
  color: white;
}

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

.tag{
  border-color: #d9d9d9!important;
  background: #d9d9d9!important;
  color: black!important;
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