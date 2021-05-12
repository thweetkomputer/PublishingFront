<template>
  <div id="Books">
    <div id="top-menu" class="dewb">
<!--      -->
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#00000000"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="1" style="float: right" class="el-icon-user-solid">登录</el-menu-item>
        <el-submenu index="2" style="float: right">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">在线编辑</el-menu-item>
          <el-menu-item index="2-2">上传文章</el-menu-item>
          <el-menu-item index="2-3">下载文章</el-menu-item>
        </el-submenu>
        <el-menu-item style="float: right" index="3" >会员中心</el-menu-item>
      </el-menu>
    </div>
    <div id="left-menu" :class="'dewb '+mobile_left">
      <i @click="showHideLeftMenu" class="el-icon-menu" id="left-btn"></i>
      <!--      导航栏-->
      <el-col :span="24" style="margin-top: 60px">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#00000020"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">发布文章</el-menu-item>
              <el-menu-item index="1-2">文章列表</el-menu-item>
              <el-menu-item index="1-3">删除文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-search"></i>
            <span slot="title">搜索</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">个人信息</el-menu-item>
              <el-menu-item index="1-2">功能2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">功能3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <div id="content" :class="mobile_content" >
      <router-view></router-view>

    </div>
    <div id="footer" :class="mobile_left">
      <span>Copyright @2021 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data(){
    return {
      screenwidth:document.body.clientWidth,
      mobile_left:'',
      mobile_content:'',
    };
  }
  ,
  mounted() {
    window.onresize=()=>{
      this.screenwidth=document.body.clientWidth
    }
    this.changeDevice()
  },
  methods:{
    changeDevice(){
      if(this.screenwidth<=500){
        this.mobile_left='xs'
        this.mobile_content='xs'
      }
    },
    showHideLeftMenu(){
      if(this.mobile_left==''){
        this.mobile_left='xs'
      }
      else{
        this.mobile_left=''
      }
      if(this.screenwidth>500){
        if(this.mobile_content==''){
          this.mobile_content='xs'
        }
        else{
          this.mobile_content=''
        }
      }
    }
  }
}
</script>

<style scoped>
.el-col{
  margin-top: 5px;
}
</style>