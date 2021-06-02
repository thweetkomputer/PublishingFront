<template>
  <div id="Books">
    <div id="content" style="margin-left: 0px;margin-top: -70px">
<!--      margin-top可以选择不用-->
      <div class="article" style="color: #00000060;width: 60%;float: left">
        <el-row>
          <el-col v-for="item in article_list" :key="item.id" :span="24">
            <div class="card dewb">
              <el-row>
                <el-col :xs="24" :lg="18">
                  <div>{{ item.title }}</div>
                  <div> {{ item.description }} </div>
                  <div>
                    <el-button
                        @click="toArticle(item.title)"
                        type="success"
                        icon="el-icon-search"
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
      <div class="side" style="width: 40%;float: right;">
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
export default {
  name: "books",
  data(){
    return {
      imagebox:[{id:0,idView:require('../assets/img/img1.jpg')},
        {id:1,idView:require('../assets/img/img2.jpg')},
        {id:2,idView:require('../assets/img/img4.png')},

        //imagebox是assets下一个放图片的文件夹
      ],
      article_list:{title:'1',description:"2",desc:"3",incare1: "1",f1:1,f2:2,f3:4}
    }
  }
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
</style>