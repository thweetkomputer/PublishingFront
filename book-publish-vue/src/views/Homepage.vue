<template>
  <div id="Books">
    <div style="margin-top: 50px; margin-left: -50px">
      <el-row>
        <el-col  :span="24" style="margin-bottom: 3px;">
          <h3 style="margin-left: 100px">用户名：{{userInfo.username}}</h3>
          <div v-show="userInfo.identity===1" style="margin-top: 10px;margin-left: 100px;">身份：作者</div>
          <div v-show="userInfo.identity===2" style="margin-top: 10px;margin-left: 100px;">身份：审稿人</div>
          <div v-show="userInfo.identity===3" style="margin-top: 10px;margin-left: 100px;">身份：编辑</div>
          <div style="margin-top: 10px;margin-left: 100px">邮箱：{{userInfo.email}}</div>

          <div style="margin-top: 10px;margin-left: 100px;">
            个人简介
            <span style="float: right;margin-right: 460px;margin-top:-25px"><el-button @click="modify()" style="margin-top: 10px;margin-bottom: 10px"><i class="el-icon-edit"></i></el-button></span>
          </div>
          <div v-show="isopen" >
            <el-form>
              <el-form-item  style="margin-top: 10px;margin-left: 100px;">
                <el-input placeholder="请输入内容" type="textarea" v-model="description" :autosize="{ minRows: 10, maxRows: 15}" style="width: 900px"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="submit" style="margin-top: 10px;margin-left: 100px;">确定</el-button>
            <el-button @click="consoleSubmit" style="margin-top: 10px;margin-left: 100px;">取消</el-button>
          </div>
          <div v-show="!isopen" style="margin-top: 20px">
            <div v-show="userInfo.description===''" style="margin-left: 100px">
              该用户比较懒，什么都没有留下～
            </div>
            <div v-show="userInfo.description!==''" style="margin-left: 100px">
              {{userInfo.description}}
            </div>
          </div>
        </el-col>
      </el-row>
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
    // this.getListData(this.currentPage);
    this.userInfo = JSON.parse(this.$store.state.userInfo)
    this.description = JSON.parse(this.$store.state.userInfo).description
  },
  methods: {
    consoleSubmit(){
      this.isopen=false;
    },
    submit(){
      axios({
        url: "/editInfo",
        method: "post",
        params: {
          user_id: JSON.parse(this.$store.state.userInfo).id,
          description: this.description
        },
      }).then((res) => {
        this.userInfo = res.data.data
        console.log(this.userInfo)
        this.$store.commit('SET_USERINFO', this.userInfo)
        console.log(this.$store.getters.getUser)
        this.isopen=false
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