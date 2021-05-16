<template>
<!--  未登录状态-->
  <div>
    <LoginWindow style="position: relative; z-index: 1"></LoginWindow>
    <div id="app">

      <div id="top-menu" class="dewb" >
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="float: right;color: #ffffff">
          <MenuItem name="1">
            <Input v-model="value4" icon="ios-search" placeholder="请输入..." style="width: 200px"></Input>
            搜索
          </MenuItem>
          <MenuItem name="1" to="/vip" v-if="is_login!=0">
            <Icon type="ios-paper" />
            会员中心
          </MenuItem>
          <Submenu name="2" v-if="is_login!=0">
            <template slot="title">
              <Icon type="ios-stats" />
              我的工作台
            </template>
            <MenuItem name="2-1">在线编辑</MenuItem>
            <MenuItem name="2-2">上传文章</MenuItem>
            <MenuItem name="2-3">下载文章</MenuItem>
          </Submenu>
          <MenuItem name="3" v-if="is_login!=0">
            <Icon type="ios-construct" />
            消息中心
          </MenuItem>
          <MenuItem name="4" v-if="true" @click.native="login">
            <Icon type="ios-construct" />
            登录
          </MenuItem>
          <MenuItem name="5" to="/login" v-if="false">
            <Icon type="ios-construct" />
            用户
          </MenuItem>
        </Menu>
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
            <el-menu-item index="1" @click="toBooks">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2" v-if="is_login!=0">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="toaddarticle">发布文章</el-menu-item>
                <el-menu-item index="1-2">文章列表</el-menu-item>
                <el-menu-item index="1-3">删除文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
      <div id="content" :class="mobile_content" >
        <router-view></router-view>
      </div>

    </div>
  </div>

<!--  -->

</template>

<script>
import LoginWindow from "@/components/LoginWindow";
export default {
  name: "Book",
  components: {LoginWindow},
  data(){
    return {
      theme1: '#00000060',
      screenwidth:document.body.clientWidth,
      mobile_left:'',
      mobile_content:'',
      value4: '',
      is_login:1,
    //  这是主界面控制变量，如果is_login为0，为未登录状态，不为1则显示已经登录，会根据用户身份的不同，显示不同的界面。
    };
  },
  mounted() {
    window.onresize=()=>{
      this.screenwidth=document.body.clientWidth
    }
    this.changeDevice()
  },
  methods:{
    login() {
      this.$store.commit('LOGIN')
    },
    tosearch(){
      this.$router.push({name:'search'})
    }
    ,
    toLogin(){
      this.$router.push({name:'Login'})
    },
    toaddarticle(){
      this.$router.push({name:'Article'})
    }
    ,
    toBooks(){
      this.$router.push({name:'Books'})
    },
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

</style>