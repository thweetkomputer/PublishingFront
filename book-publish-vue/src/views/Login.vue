<template>
  <div class="content1">
    <el-container>
      <!--      <el-header>-->
      <!--        <img class="mlogo" src="http://o.bookschina.com/images/logo0508.png" alt="">-->
      <!--      </el-header>-->

<!--      <el-main>-->
        <el-tabs type="border-card" style="width: 340px; margin:100px auto auto;">
          <el-tab-pane>
            <div slot="label" style="width: 128px;">登录</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleForm.username" clearable
                          prefix-icon="el-icon-user-solid"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item label="密 码" prop="password">
                <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleForm.password" show-password
                          clearable prefix-icon="el-icon-s-goods"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row style="text-align: center; margin-top: -10px;;">
                  <el-checkbox v-model="remember_me">记住我</el-checkbox>
                  <el-divider direction="vertical"></el-divider>
                  <el-link :underline="false">忘记密码？</el-link>
                  <!--                <el-link type="primary">g</el-link>-->
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label" style="width: 128px">注册</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleForm.username_signup" clearable
                          prefix-icon="el-icon-user-solid"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item label="密  码" prop="pass">
                <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"
                          show-password
                          clearable prefix-icon="el-icon-goods"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input maxlength="19" placeholder="请输入确认密码" type="password"
                          v-model="ruleForm.checkPass" autocomplete="off"
                          show-password clearable
                          prefix-icon="el-icon-s-goods"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item label="邮  箱" prop="email">
                <el-input maxlength="321" placeholder="请输入邮箱" type="email" v-model="ruleForm.email" clearable
                          prefix-icon="el-icon-message"
                          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!--        <el-form v-show="isLogin" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">-->
        <!--          <el-form-item label="用户名" prop="username">-->
        <!--            <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleForm.username" clearable-->
        <!--                      prefix-icon="el-icon-user-solid"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="密 码" prop="password">-->
        <!--            <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleForm.password" show-password-->
        <!--                      clearable prefix-icon="el-icon-s-goods"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--&lt;!&ndash;          <a href="#">忘记密码</a>&ndash;&gt;-->
        <!--          <el-form-item style="">-->
        <!--              <el-row style="text-align: center; margin-top: -10px;;">-->
        <!--                <el-checkbox v-model="remember_me">记住我</el-checkbox>-->
        <!--                <el-link :underline="false">忘记密码</el-link>-->
        <!--&lt;!&ndash;                <el-link type="primary">g</el-link>&ndash;&gt;-->
        <!--              </el-row>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
        <!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--          </el-form-item>-->

        <!--        </el-form>-->

        <!--        <el-form v-show="!isLogin" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
        <!--          <el-form-item label="用户名" prop="username" >-->
        <!--            <el-input maxlength="16" placeholder="请输入用户名" v-model="ruleForm.username" clearable-->
        <!--                      prefix-icon="el-icon-user-solid"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="密  码" prop="pass">-->
        <!--            <el-input maxlength="19" placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"-->
        <!--                      show-password-->
        <!--                      clearable prefix-icon="el-icon-goods"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="确认密码" prop="checkPass">-->
        <!--            <el-input maxlength="19" placeholder="请输入确认密码" type="password"-->
        <!--                      v-model="ruleForm.checkPass" autocomplete="off"-->
        <!--                      show-password clearable-->
        <!--                      prefix-icon="el-icon-s-goods"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="邮  箱" prop="email">-->
        <!--            <el-input maxlength="321" placeholder="请输入邮箱" type="email" v-model="ruleForm.email" clearable-->
        <!--                      prefix-icon="el-icon-message"-->
        <!--                      style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item>-->
        <!--            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>-->
        <!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->
<!--      </el-main>-->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else if (value.toString().length > 15) {
        return callback(new Error('用户名长度不超过15'))
      } else {
        return callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        callback();
      }
    };
    const checkUsername2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else if (value.toString().length > 15) {
        return callback(new Error('用户名长度不超过15'))
      } else {
        return callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^.+@.+\.+.+/
      if (value === '') {
        return callback(new Error('邮箱不能为空'))
      }
      if (value.toString().length > 320) {
        return callback(new Error('邮箱长度不超过320'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      rules: {
        username: [
          {validator: checkUsername, trigger: 'change'},
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        username_signup: [
          {validator: checkUsername, trigger: 'change'},
        ],
        pass: [
          {validator: validatePass1, trigger: 'blur'},
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'},
        ],
        email: [
          {trigger: 'change', validator: checkEmail}
        ],
      },
      isLogin: true,
      remember_me: false
    };
  },
  created() {
    this.isLogin = true
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const _this = this
          this.$axios.post('/login', this.ruleForm).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            console.log(userInfo)

            // Share the data
            this.$store.commit('SET_TOKEN', jwt)
            this.$store.commit('SET_USERINFO', userInfo)

            console.log(_this.$store.getters.getUser)

            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success',
              duration: 2000
            })

            this.$router.push('/books')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.mlogo {
  height: 60%;
  margin-top: 10px;
}

/*.demo-ruleForm {*/
/*  max-width: 220px;*/
/*  margin: 0 auto;*/
/*}*/
.demo-ruleForm {
  background-color: #fff;
  max-width: 320px;
  padding-right: 30px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-radius: 10px;
  margin: auto auto;
}

.content1 {
  height: 100%;
  width: 100%;
  /*border: 0px solid green;*/
  position: fixed;
  background: url(../../public/register.jpeg) 0 0 no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
</style>