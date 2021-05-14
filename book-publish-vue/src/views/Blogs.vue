<template>
  <div>
    <el-button type="primary" @click="showLoginWindow">登录</el-button>
    <button onclick="console.log('click')">登录</button>
    <div class="content1_blogs"></div>
    <LoginWindow></LoginWindow>

  </div>


</template>

<script>

import LoginWindow from "@/components/LoginWindow";

export default {
  name: "Blogs.vue",
  components: {LoginWindow},
  data() {
    return {
      showLogin: false,
    }
  },
  methods: {
    showLoginWindow() {
      console.log('click')
      this.showLogin = true
      this.$store.commit('LOGIN')
    }
  }
}
</script>

<style scoped>

</style>
<style>
.content1_blogs {
  height: 100%;
  width: 100%;
  /*border: 0px solid green;*/
  position: fixed;
  background: url(../../public/register.jpeg) 0 0 no-repeat;
  background-size: 100% 100%;
  opacity: 0.8;
  text-align: center;
}
</style>