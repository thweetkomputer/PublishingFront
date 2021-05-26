<template>
  <div>
<!--    为了更好看，我直接使用面包屑了-->
    <BreadMenu style="padding: 20px;margin-right: 426px"
        :page_name="'文章标题'"
    ></BreadMenu>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <div class="body dewb">
          <div class="header">

            {{ '作者'}}
          </div>
        </div>
        <div class="body dewb">
          <div class="dewb">
            {{ '文章简介' }}
          </div>
        </div>

        <div class="body dewb">
          <div class="article-content" >
            {{'文章内容'}}
            <!-- 文章内容 -->
          </div>
          <div class="clear"></div>
        </div>
      </el-col>
      <el-col :lg="6">
        <el-carousel :interval="4000" height="200px" style="float: right;position: absolute;width:290px;border-radius: .25rem;margin-top:-55px">
          <el-carousel-item v-for="item in imagebox" :key="item.id">
            <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :lg="6">
        <div class="" style="background-color:#ffffff; height:240px;width: 290px; box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius: .25rem;margin-top: 200px">
          <h5>热门标签</h5>
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
    <el-button type="success" style="margin-top: 10px">成功按钮</el-button>
    <el-button type="info" style="float: right;margin-right: 426px;margin-top: 10px">信息按钮</el-button>
  </div>
</template>

<script>
import BreadMenu from "../components/BreadMenu";
export default {
  name: "review",
  data(){
    return {
      imagebox:[{id:0,idView:require('../assets/img/img1.jpg')},
        {id:1,idView:require('../assets/img/img2.jpg')},
        {id:2,idView:require('../assets/img/img4.png')}
        //imagebox是assets下一个放图片的文件夹
      ]
    };
  },
  components: {
    BreadMenu,
  },
}
</script>

<style scoped>

.body.dewb .dewb {
  padding: 10px;
  color: #b7b7b7;
  font-size: 12px;
  font-style: italic;
}
.body.dewb {
  padding: 10px 10px;
  margin-top: 10px;
}
.like-btn {
  text-align: center;
  color: #fff;
}
.like-btn i {
  font-size: 30px;
  cursor: pointer;
}
.body.dewb.pinglun-item {
  color: #fff;
  font-size: 16px;
}
</style>