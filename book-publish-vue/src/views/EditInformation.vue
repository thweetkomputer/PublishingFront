<!-- 用户中心 -->
<template>
    <div>
      <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Homepage'}">个人信息</el-breadcrumb-item>
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <div class="tcommonBox">
      <header>
        <hr>
      </header>
        <ul class="userInfoBox" style="margin-left: 260px">
          <el-form class="avatarlist" ref="form"  label-width="80px">
            <el-form-item class="leftTitle" label="头像" style="margin-top:40px" ></el-form-item>
              <el-upload class="avatar-uploader" action="Userinfo/UploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="userInfoObj.avatar" :src="imageURL"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            <el-form-item class="username" label="用户名">
                <el-input v-model="userInfoObj.name" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item label="电子邮件">
                <el-input v-model="userInfoObj.email" placeholder="电子邮件"></el-input>
            </el-form-item>

            <el-form-item label="性别">
                <el-radio-group>
                  <template>
                    <el-radio class="radio" v-model="userInfoObj.sex" label="0">男</el-radio>
                    <el-radio class="radio" v-model="userInfoObj.sex" label="1">女</el-radio>
                  </template>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="简介" class="Introduction">
                <el-input v-model="userInfoObj.input" placeholder="简介"></el-input>
            </el-form-item>
          </el-form>

          <div class="saveInfobtn" >
              <el-button class="tcolors-bg" type="primary" round @click="saveInfoFun" style="margin-left: -280px;">保存</el-button>
              <el-button @click="saveInfoFun" round>取消</el-button>
        </div>
        </ul>
      </div>
    </div>
</template>

<script>
// import { getUserInfo, UserInfoSave } from '../utils/server.js'//获取用户信息，保存用户信息
import axios from "axios";

export default {
  name: 'UserInfo',
  data () { //选项 / 数据
    return {
      userInfo: '',//本地存储的用户信
      userInfoObj: {},//用户的信息
      imageURL:''
    }
  },
  methods: { //事件处理器
     handleAvatarSuccess (res,file) {//上传头像
      // console.log('用户头像',res.image_name,file);
      // console.log(URL.createObjectURL(file.raw));
      this.imageURL=URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG && isLt2M;
    },
    saveInfoFun: function () {//保存编辑的用户信息
      var that = this;
      if (!that.userInfoObj.username) { //昵称为必填
        that.$message.error('昵称为必填项，请填写昵称');
        return;
      }
      that.userInfoObj.state = Number(that.state);
      axios({
        url: "",
        method: "get",
        params: {
          userInfo:that.userInfoObj
        },
      }).then((res) => {
        that.$message.success('保存成功！');
        that.isEdit = false;
        that.routeChange();
      });

    },
    routeChange: function () {//展示页面信息
      var that = this;
      // console.log(this.$router,this.$route);
      if (localStorage.getItem('userInfo')) {
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.userId = that.userInfo.userId;
        // getUserInfo(that.userId, function (msg) {
        //   // console.log('用户中心',msg.data);
        //   that.userInfoObj = msg.data;
        //   that.userInfoObj.head_start = 0;
        //   that.userInfoObj.logo_start = 0;
        //   that.state = msg.data.state == 1 ? true : false;
        // })
        // console.log(that.userInfo);
      } else {
        that.haslogin = false;
      }
    },
  }
}
</script>

<style>
  .userInfoBox .avatarlist {
    position: relative;
  }
  .avatar-uploader {
    display: inline-block;
    vertical-align: top;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    position: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
  .gotoEdit {
    font-size: 15px;
    float: right;
    cursor: pointer;
    color: #999;
  }
  .gotoEdit:hover {
    color: #333;
  }
  /*个人设置*/
  .userInfoBox .leftTitle {
    display: inline-block;
    width: 100px;
    padding: 10px 0;
  }
  .userInfoBox .rightInner {
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
  }
  .userInfoBox li {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }
  .userInfoBox li:last-child {
    border-bottom: 1px solid transparent;
  }
  .userInfoBox .el-input,
  .userInfoBox .el-textarea {
    max-width: 300px;
    min-width: 100px;
  }
  .userInfoBox .el-input__inner {
    border-radius: 4px;
  }
  .userInfoBox .el-textarea {
    vertical-align: top;
  }
  .saveInfobtn {
    margin: 20px 0;
    text-align: center;
  }
  .saveInfobtn a {
    color: #fff;
    padding: 6px 20px;
    margin: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  .userInfoBox .fa-asterisk {
    color: #df2050;
  }
  .el-form-item__label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: black;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .el-form-item__label {
      color: black!important;
  }
</style>