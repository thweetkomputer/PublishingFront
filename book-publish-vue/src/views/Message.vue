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
              <el-col :xs="24" :lg="18">
                <div>{{ item.title }}</div>
                <div> {{ item.description }} </div>
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
      message: [{title:"1",desctiption:"2"}],
      total_num:0,
    };
  },
  mounted() {
    this.getMessageData(this.currentPage);
  },
  methods: {
    //跳转内容页
    getMessageData(page) {
      axios({
        url: "/newPassages",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.message = res.data.data;
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