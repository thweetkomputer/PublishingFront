<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>未审阅文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top:10px;">
      <el-row>
        <el-col v-for="item in article_list" :key="item.id" :span="18">
          <div class="card dewb">
            <el-row>
              <el-col :xs="24" :lg="24">
                <div>{{ item.title }}</div>
                <div> {{ item.description }} </div>
                <div style="margin: 10px">
                  <el-button @click="CheckedArticle(item.id)" >审阅通过</el-button>
                  <el-button  @click="open(item.id)">审阅不通过</el-button>
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
          :total="total_num"
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
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      article_list: [],
      total_num:0,
      dialogVisible: false
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    open(id) {
      this.$prompt('请输入文章问题', '审阅失败原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message:"操作成功"
        });
        this.UnCheckedArticle(id,value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    CheckedArticle(id){
      axios({
        url: "",
        method: "get",
        params: {
          article_id:id,
          page:this.currentPage,
          pageSize: this.pageSize,
          successMessage:"审阅成功"
        },
      }).then((res) => {
        this.article_list = res.data.data;
        this.total=res.data.data.total_num;
        this.getListData(this.currentPage);
      });
    },
    UnCheckedArticle(id,value){
      axios({
        url: "",
        method: "get",
        params: {
          article_id: id,
          page:this.currentPage,
          pageSize: this.pageSize,
          failMessage:"文章审阅失败，"+"原因是"+value,
        },
      }).then((res) => {
        this.article_list = res.data.data;
        this.total=res.data.data.total_num;
        this.getListData(this.currentPage);
      });
    },
    //跳转内容页
    getListData(page) {
      axios({
        url: "/getPassageDistributedUnreviewed",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
          reviewer_id: JSON.parse(this.$store.state.userInfo).id
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
</style>s