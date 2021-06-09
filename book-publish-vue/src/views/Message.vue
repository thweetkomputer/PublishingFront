<template>
  <div>
    <div  style="border: none;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>消息中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <div class="dewb" style="margin-top:10px;width: 70%">
      <el-row>
        <el-col v-for="item in message" :key="item.id" :span="24">
          <div class="card dewb"@click="open(item.id)">
            <el-row>
              <el-col :xs="24" :lg="18" v-show="item.has_read===400">
                <div></div>
                <div> {{ item.content }} </div>
                <div>
                  <el-button
                      type="success"
                      icon="el-icon-delete"
                      circle
                      style="margin: 10px"
                  ></el-button>
                </div>
              </el-col>
              <el-col :xs="24" :lg="18" v-show="item.has_read!==400">
                <span>您有一条新通知</span>
                <span>{{i}}</span>
                <div> {{ item.content }} </div>
                <div>
                  <el-button
                      type="success"
                      icon="el-icon-delete"
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
    <!-- 分页器 -->
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
export default {
  props: ["screenWidth"],
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      message:[],
      total_num:0,
    };
  },
  mounted() {
    this.getMessageData(this.currentPage);
  },
  methods: {
    open(id) {
      axios({
        url: "/readNotice",
        method: "get",
        params: {
          notice_id:id
        },
      }).then((res) => {
      });
      this.$alert(this.notice.content, this.notice.title, {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    //跳转内容页
    readNotice(id){

    },
    getMessageData(page) {
      axios({
        url: "/getNotice",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
          user_id:JSON.parse(this.$store.state.userInfo).id,
        },
      }).then((res) => {
        this.message = res.data.data.notice_list;
        this.total=res.data.data.total_num;
      });
    },
    currentChange(val) {
      console.log("第" + val + "页");
      this.currentPage = val;
      this.getMessageData(val);
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