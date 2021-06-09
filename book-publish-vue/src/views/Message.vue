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
          <div class="card dewb" >
            <el-row>
              <el-col :xs="24" :lg="18" v-show="item.hasRead===1" >
                <div @click="open(item.id)">
                  <span style="float: left">该消息已读 </span>
                  <span style="float: right">{{item.createdTime}}</span>
                  <div> {{ item.content }} </div>
                </div>

              </el-col>
              <el-col :xs="24" :lg="18" v-show="item.hasRead!==1" >
                <div @click="open(item.id)">
                  <span style="float: left">您有一条新通知 </span>
                  <span style="float: right">{{item.createdTime}}</span>
                  <div> {{ item.content}} </div>
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
      for (let i = 0; i < this.message.length; i++) {
        // console.log(this.message[i].id)
        if (this.message[i].id === id) {
          // alert(this.message[i].content)
          this.$alert(this.message[i].content,  "消息内容",{
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      }
      axios({
        url: "/readNotice",
        method: "get",
        params: {
          notice_id:id
        },
      }).then((res) => {
        // for (let m in  this.message) {
        //   if (m.id === id) {
        //     m.hasRead = 1
        //   }
        // }
        for (let i = 0; i < this.message.length; i++) {
          // console.log(this.message[i].id)
          if (this.message[i].id === id) {
            // alert(this.message[i].content)
            this.message[i].hasRead = 1
          }
        }
      });

    },
    //跳转内容页
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