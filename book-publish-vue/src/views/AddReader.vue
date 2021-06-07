<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>未审阅文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="dewb" style="margin-top:10px">
      <el-row>
        <el-col v-for="item in article_list" :key="item.id" :span="24">
          <div class="card dewb" @click="toArticle(item.id)">
            <el-row>
              <el-col :xs="24" :lg="24">
                <div>{{ item.title }}</div>
                <div> {{ item.description }} </div>
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
  props: ["screenWidth"],
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      article_list: [{title:"1",id:"2"},{title: "2",id:"3"}],
      total_num:0,
      checkedLabel: [],
      dialogVisible: false,
      ReaderId:'',
      LabelList:[{
        id:'1',
        name:'1'
      },
        {
          id:'2',
          name:'2'
        },
        {
          id:'3',
          name:'3'
        },
        {
          id:'4',
          name:'4'
        }
      ]
    };
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    toArticle(id){
      this.$router.push({path:'/readercontent',query:{id:id}})
    },
    getReaderData() {
      axios({
        url: "/getReviewer",
        method: "post",
      }).then((res) => {
        this.LabelList = res.data.data;
      });
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.LabelList.length;
    },
    //跳转内容页
    getListData(page) {
      axios({
        url: "/getPassageUnreviewed",
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