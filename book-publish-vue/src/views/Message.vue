<template>
  <div>
    <div  style="border: none;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>消息中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <div id="content" style="margin-left: 0px;margin-top: -70px">
      <!--      margin-top可以选择不用-->
      <div class="article" style="color: #00000060;width: 80%;float: left" >
        <el-row class="fudong">
          <el-col v-for="item in message" :key="item.id" :span="24" style="margin-bottom: 3px;">
            <div class="card dewb" style="height: 120px" @click="open(item.id)">
              <el-row style="margin-left: 10px">
                <div v-show="item.hasRead===1">
                  <el-col :xs="24" :lg="18" >
                    <div style="margin-top: 10px">
                      <div style="float: left;">该消息已读 </div>
                      <div style="float: right">{{ item.createdTime.replace('T', ' ') }}</div>
                    </div>
                  </el-col>
                  <el-col><hr></el-col>
                  <el-col style="margin-top: 0px">
                    <div> {{ item.content }} </div>
                  </el-col>
                </div>

                <div v-show="item.hasRead===0" style="color: black" class="red-point">
                <el-col :xs="24" :lg="18">
                  <div style="margin-top: 10px">
                    <div style="float: left;">您有一条新通知 </div>
                    <div style="float: right">{{ item.createdTime.replace('T', ' ') }}</div>
                  </div>
                </el-col>
                <el-col><hr></el-col>
                <el-col style="margin-top: 0px">
                  <div> {{ item.content }} </div>
                </el-col>
                </div>

              </el-row>
            </div>
          </el-col>
        </el-row>
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

.red-point{
  position: relative;
}

.red-point::before{
  content: " ";
  border: 5px solid red;/*设置红色*/
  border-radius:5px;/*设置圆角*/
  position: absolute;
  z-index: 1000;
  right: 0;
  margin-right: -2px;
  margin-top: -2px;
}
</style>