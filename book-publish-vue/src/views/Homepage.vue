<template>
  <div id="Books">
    <div>
      <el-row>
        <el-col  :span="24" style="margin-bottom: 3px;">
          <h3 style="margin-left: 100px">用户名：{{}}</h3>
          <div style="margin-top: 10px;margin-left: 100px">身份：{{}}</div>
          <div style="margin-top: 10px;margin-left: 100px">邮箱：{{}}</div>

          <div style="margin-top: 10px;margin-left: 100px;">
            个人简介
            <span style="float: right;margin-right: 460px;margin-top:-25px"><el-button @click="modify()" style="margin-top: 10px">修改个人简介</el-button></span>
          </div>
          <div v-show="isopen" >
            <el-input v-model="description" placeholder="请输入内容" style="margin-top: 10px;margin-left: 100px" type="textarea"
                      :maxlength="120"
                      :rows="2"></el-input>
            <el-button @click="submit" style="margin-top: 10px;margin-left: 100px">确定</el-button>
            <el-button @click="consoleSubmit" style="margin-top: 10px;margin-left: 100px">取消</el-button>
          </div>
          <div v-show="!isopen" style="margin-left: 100px">
            {{}}
          </div>

        </el-col>
      </el-row>
    </div>
    <div id="content" style="margin-left: 0px;margin-top: -70px">
      <h5>我的动态</h5>
      <div class="article" style="color: #00000060;width: 60%;float: left">
        <el-row class="fudong">
          <el-col v-for="item in article_list" :key="item.id" :span="24" style="margin-bottom: 3px;">
            <div class="card dewb" style="height: 120px" @click="toArticle(item.id)">
              <el-row>
                <el-col :xs="24" :lg="18">
                  <div style="padding-left: 30px; padding-top: 10px">
                    <div class="word"><h2 style="display: inline">{{ item.title }}</h2><span style="padding-left: 10px; padding-top: 15px; float: right">{{item.type}}</span></div>
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
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
        >
        </el-pagination>
      </div>
      <div class="side" style="width: 39%;margin-left: 888px; position: fixed">
        <el-row>
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
            <div class=""
                 style="background-color:#fff; height:240px;width: 290px; box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius: .25rem;">
              <h5 style="color:black; padding-top: 7px; padding-left: 5px">热门标签</h5>
              <hr>
              <el-tag type="info" class="tag">历史</el-tag>
              <el-tag type="info" class="tag">科技</el-tag>
              <br>
              <el-tag type="info" class="tag">人文</el-tag>
              <el-tag type="info" class="tag">军事</el-tag>
              <el-tag type="info" class="tag">地理</el-tag>
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
  data() {
    return {
      imagebox: [{id: 0, idView: require('../assets/img/img1.jpg')},
        {id: 1, idView: require('../assets/img/img2.jpg')},
        {id: 2, idView: require('../assets/img/img4.png')},

        //imagebox是assets下一个放图片的文件夹
      ],
      description:'',
      article_list: {},
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      total_num: 0,
      value: false,
      isopen:false,
      userInfo:JSON.parse(this.$store.state.userInfo),
    }
  },
  mounted() {
    this.getListData(this.currentPage);
  },
  methods: {
    consoleSubmit(){
      this.isopen=false;
      this.description='';
    },
    submit(){
      alert(this.description)
      axios({
        url: "",
        method: "get",
        params: {
          user_id:this.userInfo.id,
          description:this.description
        },
      }).then((res) => {
        this.isopen=false;
        this.description='';
      });
    },
    modify(){
      this.isopen=true;
    },
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
        url: "",
        method: "get",
        params: {
          page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.article_list = res.data.data.article_list;
        this.total = res.data.data.total_num;
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
}

.word{
  color: black;
}
.word:hover{
  color: #265194!important;
}
</style>