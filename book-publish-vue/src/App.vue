<template>
  <!--  未登录状态-->
  <div>
    <div>
      <LoginWindow style="position:relative;z-index: 1"></LoginWindow>
    </div>
    <div id="app">
      <div id="top-menu" class="dewb">
        <Menu mode="horizontal" style="background-color: #00000020;border: none;">
          <Submenu name="5" style="float:right " v-if="this.$store.state.userInfo!==null">
            <template slot="title">
              <Icon type="ios-people"></Icon>
              用户
            </template>
            <Menu-item name="5-1" to="/Homepage">个人信息</Menu-item>
            <Menu-item name="5-2" @click.native="logout">退出登录</Menu-item>
          </Submenu>
          <MenuItem name="4" @click.native="login" v-if="this.$store.state.userInfo===null" style="float: right">
            <Icon type="ios-construct"/>
            登录
          </MenuItem>
          <MenuItem name="7" to="/vip" style="float: right">
            <Icon type="ios-paper"/>
            会员中心
          </MenuItem>
          <MenuItem name="3" v-if="this.$store.state.userInfo!==null" style="float: right" to="/message">
            <Icon type="ios-construct"/>
            消息中心
          </MenuItem>
          <MenuItem name="6" style="float: right" to="/search">
            <Input v-model="value4" icon="ios-search" placeholder="请输入..."
                   style="width:200px;margin-right: 10px"></Input>
            搜索
          </MenuItem>
          <MenuItem name="1" v-if="this.$store.state.userInfo===null" @click="console.log(this.$store.state.is_login)">
            图标
          </MenuItem>
          <MenuItem name="2" to="/books" v-if="this.$store.state.userInfo===null">
            <Icon type="ios-paper"/>
            首页
          </MenuItem>
        </Menu>
      </div>
      <div id="left-menu" :class="'dewb '+mobile_left" v-if="this.$store.state.userInfo!==null">
        <i @click="showHideLeftMenu" class="el-icon-menu" id="left-btn"></i>
        <!--      导航栏-->
        <el-col :span="24" style="margin-top: 60px">
          <el-menu
              class="el-menu-vertical-demo"
              background-color="#00000020"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              @select="chooseMenu"
          >
            <el-menu-item index="1" @click="toBooks">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/article">我的文章</el-menu-item>
                <el-menu-item index="/collect">收藏文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>我的工作台</span>
              </template>
              <el-menu-item-group v-if="JSON.parse(this.$store.state.userInfo).identity===1">
                <!--        作者界面      -->
                <el-menu-item index="/add-article">编辑文章</el-menu-item>
                <el-menu-item index="/submit">提交文章</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="JSON.parse(this.$store.state.userInfo).identity===2">
                <!--        审稿人界面      -->
                <el-menu-item index="/review">未审阅文章</el-menu-item>
                <el-menu-item index="/article_reviewed">已审阅文章</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="JSON.parse(this.$store.state.userInfo).identity===3">
                <!--        编辑界面      -->
                <el-menu-item index="/addreader">未处理文章</el-menu-item>
                <el-menu-item index="/article_reviewed">已处理文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
      <div id="content" :class="mobile_content">
        <router-view :screenwidth="screenwidth"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import LoginWindow from '@/components/LoginWindow'

export default {
  name: "Book",
  data() {
    return {
      screenwidth: document.body.clientWidth,
      mobile_left: '',
      mobile_content: '',
      value4: '',
      is_login: this.$store.state.is_login
      //  这是主界面控制变量，如果is_login为0，为未登录状态，不为1则显示已经登录，会根据用户身份的不同，显示不同的界面。
    };
  },
  mounted() {
    window.onresize = () => {
      this.screenwidth = document.body.clientWidth
    }
    this.changeDevice()
  },
  // computed:{
  //   is_login(){
  //     this.$store.commit('get_is_login')
  //   }
  // },
  methods: {
    // tosearch(){
    //   this.$router.push({name:'search'})
    // }
    // ,
    // toLogin(){
    //   this.$router.push({name:'Login'})
    // },
    login() {
      this.$store.commit('WANT_LOGIN')
    },
    tosearch() {
      this.$router.push({name: 'search'})
    }
    ,
    toLogin() {
      this.$router.push({name: 'Login'})
    },
    toaddarticle() {
      this.$router.push({name: 'Article'})
    }
    ,
    chooseMenu(index) {
      console.log(index)
      this.$router.push({path: index})
    }
    ,
    toBooks() {
      this.$router.push({name: 'Books'})
    },
    changeDevice() {
      if (this.screenwidth <= 500) {
        this.mobile_left = 'xs'
        this.mobile_content = 'xs'
      }
    },
    showHideLeftMenu() {
      if (this.mobile_left == '') {
        this.mobile_left = 'xs'
      } else {
        this.mobile_left = ''
      }
      if (this.screenwidth > 500) {
        if (this.mobile_content == '') {
          this.mobile_content = 'xs'
        } else {
          this.mobile_content = ''
        }
      }
    },
    logout() {
      this.is_login = 0;
      console.log(1111)
      this.$store.commit('LOGOUT')
      // this.$router.push({name: 'Books'})
      this.$router.go(0)
    }
  }
  ,
  components: {
    LoginWindow,
  }
}
</script>
<style scoped>
.ivu-menu-horizontal .ivu-menu-item[data-v-7ba5bd90], .ivu-menu-horizontal .ivu-menu-submenu[data-v-7ba5bd90] {
  color: #FFFFFF;
}
</style>