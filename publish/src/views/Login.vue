<template>
  <div id="login">
    这是登录界面
    <canvas id='myCanvas' ></canvas>
    <div id="form_box">
      <el-form ref="form" :model="form" label-width="80px" class="login-form">
        <h2 class="login-title">登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-button">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-button">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrapper">
      <div class="text" data-text="2020">Merry Christmas</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>