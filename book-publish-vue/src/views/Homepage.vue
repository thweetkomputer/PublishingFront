<!-- 用户中心 -->
<template>
  <div>
    <div style="width:50%;float: left">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <div class="card">
          <span>用户名</span>
        </div>
        <div class="card">
          <span>个人邮箱</span>
        </div>
        <div class="card">
          <span>我的文章数</span>
        </div>
        <div class="card">
          <span>收藏文章数</span>
        </div>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2">
        </el-input>
      </el-card>
    </div>
    <div style="width: 48%;float: right;">
<!--      <el-calendar v-model="value" style="background-color: #B3C0D1">-->
<!--      </el-calendar>-->
    </div>
  </div>
</template>
<script src="../assets/css/sex/iconfont.js">
import axios from "axios";
export default {
  data() {
    return {
      input: '',
      userInfo: {},
      textarea2: ''
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.userInfo = store.state.userInfo
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
  background-color: transparent;
}

.el-input.is-disabled .el-input__inner {
  background-color: white;
  border-color: white;
  color: black;
  cursor: not-allowed;
  height: 40px;
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

.box-card::shadow {
  color: #696969;
}

.el-button--danger {
  color: white;
  background-color: transparent;
  border-color: transparent;
}

.el-button--danger:hover {
  color: #F56C6C;
  background-color: transparent;
  border-color: transparent;
}
.card{
  margin-bottom:10px;
  border:none;
}
</style>