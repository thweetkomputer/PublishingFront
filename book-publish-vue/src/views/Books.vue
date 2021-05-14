<template>
  <div id="Books">
    <el-row :gutter="30">
      <el-col :xs='24' :lg="24">
        <div class="dewb" style="height:240px">
          <span style="color: #ffffff">这是文章1</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xs='24':lg="24">
        <div class="dewb" style="height:240px">
          <span style="color: #ffffff">这是文章2</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xs='24' :lg="24">
        <div class="dewb" style="height:240px" >
          <span style="color: #ffffff">这是文章3</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="24">
        <div class="dewb" style="height:240px">
          <span style="color: #ffffff">这是文章4</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="24">
        <div class="dewb" style="height:240px">
          <span style="color: #ffffff">这是文章5</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="24">
        <div class="dewb" style="height:240px">
          <span style="color: #ffffff">这是文章1</span>
        </div>
      </el-col>
    </el-row>
    <div id="footer" :class="mobile_left">
      <span>Copyright @2021 </span>
    </div>
  </div>
</template>

<style scoped>
.el-col{
  margin-top: 5px;
}
</style>