<!-- 用户中心 -->
<template>
    <div>

      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="block" style="margin-top:50px;margin-left:200px">
          <el-avatar :size="100" :src="circleUrl"></el-avatar>
          <div style="margin-top: -100px;margin-left:130px">Name</div>
          <div style="margin-left:120px">
            <span color="#A9A9A9" font-size="12px">您还不是会员身份</span>
            <el-button type="danger" round @click="$router.push('/vip')">开通会员</el-button>
          </div>
      </div>

      <el-card class="box-card" shadow="hover" style="margin-top: 60px;margin-left: 130px;">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
           <el-button type="primary" icon="el-icon-edit" circle 
                    @click="$router.push('/EditInformation')" style="float: right;">
                </el-button>
        </div>
        <div style="margin-left:10px">
          <span/>用户名 
          <span style="margin-left:40px" font-size="150%"/>Name
        </div>
        <div style="margin-top:10px;margin-left:15px">
          <span/>性别
            <svg class="icon" aria-hidden="true" style="margin-left:60px;">
              <use xlink:href="#icon-xingbienan"></use>
            </svg>
        </div>
         <div class="id" style="margin-top:10px;margin-left:15px">
          <span/>身份 
          <span style="margin-left:60px"/>作者
        </div>

        <div class="email" style="margin-top:10px">
            <span/>电子邮件 
            <span style="margin-left:10px"/>xxx@qq.com
        </div>
        
        <div>
            <span>个人简介</span>
            <el-input class="introduce"
            v-model="input"
            :disabled="true" style="margin-left:10px;width:200px;"
            >
            </el-input>  
        </div>
      </el-card>
    </div>
</template>

<<<<<<< HEAD
<script src="../assets/css/sex/iconfont.js">
=======
<script>
  import axios from "axios";

>>>>>>> 62e7a09d35edf655b3adbd4d1f14c1eeab58fdfa
  export default{
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        input: '',
        userInfo:{
        },
      }
    },
    mounted() {
      this.getUserInfo(1);
      //这里要改
    },
    methods:{
      getUserInfo(id){
        axios({
          url: "",
          method: "get",
          params: {
            id:id
          },
        }).then((res) => {
          // console.log(res.data)
          this.userInfo = res.data.data;

        });
      }
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
    color: #fc5531;
    background-color: transparent;
    border-color: transparent;
}
  .el-button--danger:hover{
    color:#fc5531;
    background-color:transparent;
     border-color: transparent;
  }
  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 12px;
    font-size: 14px;
    border-radius: 4px;
}
  
</style>