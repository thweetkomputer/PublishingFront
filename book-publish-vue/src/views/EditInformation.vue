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
            <el-upload
                :limit="1"
                class="upload-demo"
                ref="upload"
                action
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :http-request="UploadSubmit"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="ruleForm.dialogImageUrl" alt />
            </el-dialog>
            <el-form-item class="username" label="用户名">
                <el-input v-model="username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item label="电子邮件">
                <el-input v-model="email" placeholder="电子邮件"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                  <template>
                    <el-radio class="radio" v-model="gender" label="1" :value="gender">男</el-radio>
                    <el-radio class="radio" v-model="gender" label="0" :value="gender">女</el-radio>
                  </template>
            </el-form-item>
            <el-form-item label="简介" class="Introduction">
                <el-input v-model="inputContent" placeholder="简介"></el-input>
            </el-form-item>
          </el-form>
          <div class="saveInfobtn" >
              <el-button class="tcolors-bg" type="primary" round @click="submitUpload" style="margin-left: -280px;">保存</el-button>
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
      username:'',
      email:'',
      gender:'1',
      inputContent:'',
      uploadDisabled: false,
      logoId: "1", //专区logo id
      dialogVisible: false,
      fileList: [],
      ruleForm: {
        dialogImageUrl: "1", //专区logo 上传到后台之后，后台会返回一个id,只需要给后台传id,但是点击编辑的时候后台返回的是http地址
      },
    }
  },
  methods: { //事件处理器
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    UploadSubmit(param) {//保存编辑的用户信息
      var file = param.file;
      var file_form = new FormData(); //获取上传表单（文件）
      file_form.append("userInfo",this.$store.state.userInfo)
      file_form.append("username",this.username);
      file_form.append("gender",this.gender);
      file_form.append("description",this.inputContent);
      file_form.append("email",this.email);
      file_form.append("image", file);
      console.log(file_form.get('userInfo'))
      console.log(file_form.get('username'))
      console.log(file_form.get('gender'))
      console.log(file_form.get('description'))
      console.log(file_form.get('email'))
      console.log(file_form.get('image'))
      this.$axios({
        url: "",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        },
        data: file_form,
      })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

    },
    routeChange: function () {//展示页面信息
      var that = this;
      // console.log(this.$router,this.$route);
      if (localStorage.getItem('userInfo')) {
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.userId = that.userInfo.userId;
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