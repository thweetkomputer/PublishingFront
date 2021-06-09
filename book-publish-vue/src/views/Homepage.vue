<!-- 用户中心 -->
<template>
    <div>

      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>



      <el-card class="box-card" shadow="hover" style="margin-top: 100px;margin-left: 130px;">
        <div slot="header" class="clearfix">
          <span>基本信息</span>

        </div>
        <div style="margin-left:10px">
          <span/>用户名 

          <span style="margin-left:40px">{{ JSON.parse(this.$store.state.userInfo).username }}</span>
        </div>
        <div style="margin-top:10px;margin-left:15px">
          <span/>性别
            <svg class="icon" aria-hidden="true" style="margin-left:60px;" v-if="JSON.parse(this.$store.state.userInfo).gender===1">
              <use xlink:href="#icon-xingbienan"></use>
            </svg>
          <svg class="icon" aria-hidden="true" style="margin-left:60px;" v-else>
            <use xlink:href="#icon-xingbienv"></use>
          </svg>
        </div>
         <div class="id" style="margin-top:10px;margin-left:15px">
          <span/>身份
           <span style="margin-left:60px">
             <span v-if="JSON.parse(this.$store.state.userInfo).identity===1">作者</span>
             <span v-if="JSON.parse(this.$store.state.userInfo).identity===2">审稿人</span>
             <span v-if="JSON.parse(this.$store.state.userInfo).identity===3">编辑</span>
           </span>
        </div>

        <div class="email" style="margin-top:10px;margin-left:15px">
            <span/>邮箱
            <span style="margin-left:10px"/>{{JSON.parse(this.$store.state.userInfo).email}}
        </div>
        <div>
            <span>个人简介</span>
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea" style="margin-left:10px;width:200px;">
          </el-input>
          <el-button type="primary" icon="el-icon-edit" circle
                     @click="submitInfo()" style="float: right;">
          </el-button>
        </div>
      </el-card>
    </div>
</template>
<script src="../assets/css/sex/iconfont.js">
  import axios from "axios";

  export default{
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        input: '',
        userInfo: {

        },
        textarea:JSON.parse(this.$store.state.userInfo).description
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods:{
      getUserInfo(){
        this.userInfo=store.state.userInfo
      },
      submitInfo() {//保存编辑的用户信息
        axios({
          url: "/editInfo",
          method: "post",
          params: {
            user_id: JSON.parse(this.$store.state.userInfo).id,
            description: this.textarea
          },
        }).then((res) => {
          const userInfo = res.data.data
          console.log(userInfo)
          this.$store.commit('SET_USERINFO', userInfo)
          console.log(this.$store.getters.getUser)
          this.$router.push("/Homepage")
        });
      },
    },
  }
</script>

<style>
  .el-button--primary {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
  }
  .el-button.is-circle {
    border-radius: 50%;
    padding: 10px;
}
  .icon {
    width: 26px;
    height: 26px;
    border-color: transparent;
    background-color:transparent;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: white;
    border-color: white;
    color: black;
    cursor: not-allowed;
    height:40px;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 25px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 520px;
  }
  .box-card::shadow{
    color:#696969;
  }
  .el-button--danger {
    color: white;
    background-color: transparent;
    border-color: transparent;
}
  .el-button--danger:hover{
    color:#F56C6C;
    background-color:transparent;
     border-color: transparent;
  }
  
</style>