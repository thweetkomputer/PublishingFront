<template>
  <div>
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default{
  name:'zmd',
  data(){
    return {
      imagebox:[{id:0,idView:require('../assets/img/img1.jpg')},
        {id:1,idView:require('../assets/img/img2.jpg')},
        {id:2,idView:require('../assets/img/img4.png')}
        //imagebox是assets下一个放图片的文件夹
      ]
    }
  }
}
</script>
<style>
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
</style>

