<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="dewb" style="margin-top:10px">
      <el-row>
        <el-col v-for="item in article_list" :key="item.id" :span="24">
          <div class="card dewb">
            <el-row>
              <el-col :xs="24" :lg="24">
                <div>{{ item.title }}</div>
                <div> 作者：{{ item.nickName }} </div>
                <div style="margin: 10px">
                  <el-button type="text" @click="open">发布文章</el-button>
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
      article_list: [{title:"1",id:"2"},{title: "2",id:"3"}],
      total_num:0,
      checkedLabel: [],
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
    this.getMessageData(this.currentPage);
  },
  methods: {
    open() {
      this.$alert('确认发布', '发布文章', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }，`,

          });
        }
      });
    },
    ResetReaderId(){
      this.ReaderId='';
      console.log(this.checkedLabel)
      this.checkedLabel=[];
    },
    submit(id){
      axios({
        url: "",
        method: "get",
        params: {
          id,
          page,
          pageSize: this.pageSize,
          ReaderId:this.checkedLabel
        },
      }).then((res) => {
        this.article_list = res.data.data;
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
    setReaderId(id){
      this.ReaderId=id;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.LabelList.length;
    },
    //跳转内容页
    getMessageData(page) {
      axios({
        url: "",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data;
        this.total_num=res.data.data.total_num;
        this.LabelList=res.data.data.ReaderId;   //这个是不对的，我要获得所有的审稿人信息。
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
    methods: {
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.Reader.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
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