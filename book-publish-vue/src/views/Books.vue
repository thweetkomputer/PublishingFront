<template>
  <div id="Books">
    <div id="content" style="margin-left: 0px;margin-top: -70px">
<!--      margin-top可以选择不用-->
      <div class="article" style="color: #00000060;width: 60%;float: left">
        <el-row>
          <el-col v-for="item in article_list" :key="item.id" :span="24" style="margin-bottom: 3px;">
            <div class="card dewb" style="height: 120px" @click="toArticle(item.title)">
              <el-row >
                <el-col :xs="24" :lg="18" >
                  <div>{{ item.title }}</div>
                  <div> {{ item.description }} </div>
<!--                  <div>-->
<!--                    <el-button-->
<!--                        -->
<!--                        type="success"-->
<!--                        icon="el-icon-search"-->
<!--                        circle-->
<!--                        style="margin: 10px"-->
<!--                    ></el-button>-->
<!--                  </div>-->
                </el-col>
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
      <div class="side" style="width: 39%;float: right; ">
        <el-row >

          <el-col :xs="10" :lg="10">
            <div style=" ">
              <el-carousel :interval="4000" height="240px" style="float: left;width:290px;border-radius: .25rem;">
                <el-carousel-item v-for="item in imagebox" :key="item.id">
                  <img :src="item.idView" class="image">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :xs='10' :lg="10" style="float: left;margin-top: 245px;position: absolute">
            <div class="" style="background-color:#00000060; height:240px;width: 290px; box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius: .25rem;">
              <h5 style="color:white">热门标签</h5>
              <hr>
              <el-tag type="info" class="tag">历史</el-tag>
              <el-tag type="info">科技</el-tag>
              <br>
              <el-tag type="info">人文</el-tag>
              <el-tag type="info">军事</el-tag>
              <el-tag type="info">地理</el-tag>
            </div>
          </el-col>
          <el-col :xs='10' :lg="10" style="float: left;margin-top: 500px;position: absolute">
            <div class="" style="background-color:#00000060; height:240px;width: 290px; box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius: .25rem;">
              <h5 style="color:white">热门标签</h5>
              <hr>
              <el-tag type="info" class="tag">历史</el-tag>
              <el-tag type="info">科技</el-tag>
              <br>
              <el-tag type="info">人文</el-tag>
              <el-tag type="info">军事</el-tag>
              <el-tag type="info">地理</el-tag>
            </div>
          </el-col>
          <el-col :xs='10' :lg="10" style="float: left;margin-top: 740px;position: absolute">
            <div class="" style="background-color:#00000060; height:240px;width: 290px; box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius: .25rem;">
              <h5 style="color:white">热门标签</h5>
              <hr>
              <el-tag type="info" class="tag">历史</el-tag>
              <el-tag type="info">科技</el-tag>
              <br>
              <el-tag type="info">人文</el-tag>
              <el-tag type="info">军事</el-tag>
              <el-tag type="info">地理</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "books",
  data(){
    return {
      imagebox:[{id:0,idView:require('../assets/img/img1.jpg')},
        {id:1,idView:require('../assets/img/img2.jpg')},
        {id:2,idView:require('../assets/img/img4.png')},

        //imagebox是assets下一个放图片的文件夹
      ],
      article_list:{title:'1',description:"2",desc:"3",incare1: "1",f1:1,f2:2,f3:4,f4:'5',f6:'6',f7:'7'},
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      total_num:0,
      value:false
    }
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
}
</script>


<style scoped>
.el-row{
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
  margin:5px;
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
</style>