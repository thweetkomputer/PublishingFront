<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>编辑审稿人</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <Advertisement style="margin-left: 1000px;margin-top: 35px"></Advertisement>
    <div id="Books">
      <div id="content" style="margin-left: 0px;margin-top: -70px">
        <!--      margin-top可以选择不用-->
        <div class="article" style="color: #00000060;width: 60%;float: left">
          <el-row class="fudong">
            <el-col v-for="item in article_list" :key="item.id" :span="24" style="margin-bottom: 3px;">
              <div class="card dewb" style="height: 160px" @click="toInfo(item.id)">
                <el-row>
                  <el-col :xs="24" :lg="18">
                    <div style="padding-left: 30px; padding-top: 10px">
                      <div class="word"><h2 style="display: inline">{{ item.username }}</h2><span
                          style="padding-left: 10px; padding-top: 15px; float: right">{{ item.id }}</span></div>
                      <hr>
                      <div class="word" v-show="item.description!=null && item.description!==undefined">
<!--                        {{ item.description.length > 36 ? item.description.slice(0, 36) + '...' : item.description }}-->
                        1
                      </div>
                      <div class="word" v-show="item.description==null || item.description===undefined"> 此人无简介</div>
                    </div>
                    <button @click="deleteArticle(item.id)" class="c1"
                            style="font-size:15px;float: right;background-color: #409EF4c0;color:white;border:none;border-radius:5px;padding: 5px 5px ">
                      删除审稿人
                    </button>
                    <!--                    <el-button class="quxiao" @click="deleteArticle(item.id)" style="float: right;margin-left: 30px;margin-top: 10px;background-color: #409EFF;color: white" size="15">取消收藏</el-button>-->
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
              style="display: inline-block"
              @current-change="currentChange"
          >
          </el-pagination>
          <el-button style="display: inline-block" @click="dialogVisible = true">添加审稿人</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-button type="text" @click="dialogVisible = true">编辑</el-button>

      <el-dialog title="添加审稿人" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email" type="email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReviewer">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import Advertisement from "@/components/Advertisement";

export default {
  props: ["screenWidth"],
  components: {Advertisement},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      article_list: [{page: '1'}],
      total_num: 0,
      value: false,
      dialogVisible: false,

      username: '',
      email: ''
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    //跳转内容页
    toArticle(id) {
      let routeUrl = this.$router.resolve({
        path: "/content",
        query: {id: id}
      });
      window.open(routeUrl.href, '_blank');
    },
    getListData(page) {
      axios({
        url: "/getReviewerList",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total_num = res.data.data.total_num;

      });
    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getListData(val);
    },

    //删除审稿人
    deleteArticle(id) {
      axios({
        url: "/deleteReviewer",
        method: "post",
        data: Qs.stringify({
          id: id,
        }),
      }).then((res) => {
        this.getListData(this.currentPage)
      });

    },
    addReviewer() {

      axios({
        url: "/addReviewer",
        method: "post",
        data: Qs.stringify({
          username: this.username,
          email: this.email
        }),
      }).then((res) => {
        this.getListData(this.currentPage)
      });
      this.dialogVisible = false
      this.email = ''
      this.username = ''
    },
    //跳转内容页
    toInfo(id) {
      let routeUrl = this.$router.resolve({
        path: "/UserInfo",
        query: {id: id}
      });
      window.open(routeUrl.href, '_blank');
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

.tag {
  border-color: #d9d9d9 !important;
  background: #d9d9d9 !important;
  color: black !important;
}


.tag:hover {
  color: #409EFF !important;

}

.fudong :hover {
  background: #f7f7f7;
  border-radius: 5px;
  cursor: pointer
}

.word {
  color: black;
}

.word:hover {
  color: #265194 !important;
}

.c1:hover {
  box-shadow: #8c939d 1px 1px;
  background-color: #409EF4ff;
}

</style>