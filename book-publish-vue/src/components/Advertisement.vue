<template>
  <div class="side" style="width: 39%;margin-left: 888px;margin-top: 145px; position: fixed">
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
</template>

<script>
export default {
  name: "Advertisement",
  data() {
    return {
      imagebox: [{id: 0, idView: require('../assets/img/img1.jpg')},
        {id: 1, idView: require('../assets/img/img2.jpg')},
        {id: 2, idView: require('../assets/img/img4.png')},

        //imagebox是assets下一个放图片的文件夹
      ]
    }
  }
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