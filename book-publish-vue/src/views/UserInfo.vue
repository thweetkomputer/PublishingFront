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
            <div v-show="userInfo.description==='' || userInfo.description===undefined || userInfo.description===null" style="margin-left: 100px">
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
    const query = this.$route.query;
    return {
      imagebox: [{id: 0, idView: require('../assets/img/img1.jpg')},
        {id: 1, idView: require('../assets/img/img2.jpg')},
        {id: 2, idView: require('../assets/img/img4.png')},

        //imagebox是assets下一个放图片的文件夹
      ],
      id: query.id,
      description:'',
      article_list: {},
      currentPage: 1,
      pageSize: 10,
      total: 10,
      //total是条目总数，
      total_num: 0,
      value: false,
      isopen:false,
      userInfo: {}

    }
  },
  mounted() {
    // this.getListData(this.currentPage);
    this.getUserInfo(this.id);
  },
  methods: {
    getUserInfo(id) {
      axios({
        url: "/getUserInfo",
        method: "post",
        params: {
          id: id
        },
      }).then((res) => {
        this.userInfo = res.data.data
      });
    }
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