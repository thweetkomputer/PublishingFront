<template>
  <div class="dewb">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ModifyPassword",
  date(){
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if ((value + "").toString().length > 18 || (value + "").toString().length < 6) {
        callback(new Error('密码长度为6-18位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleFormSignup.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitFormSignup(formName) {
      // this.ruleFormSignup.username = this.ruleFormSignup.username.trim()
      // this.ruleFormSignup.checkCode = this.ruleFormSignup.checkCode.trim()
      // this.ruleFormSignup.pass = this.ruleFormSignup.pass.trim()
      // this.ruleFormSignup.checkPass = this.ruleFormSignup.checkPass.trim()
      // this.ruleFormSignup.email = this.ruleFormSignup.email.trim()
      // console.log('signup')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // alert('submit!');
      //     const _this = this
      //     this.$axios.post('/signup', this.ruleFormSignup).then(res => {
      //       const jwt = res.headers['authorization']
      //       const userInfo = res.data.data
      //       console.log(userInfo)
      //
      //       // // Share the data
      //       // _this.$store.commit('SET_TOKEN', jwt)
      //       // _this.$store.commit('SET_USERINFO', userInfo)
      //       //
      //       // console.log(_this.$store.getters.getUser)
      //       // this.$message({
      //       //   showClose: true,
      //       //   message: '注册成功，请重新登录',
      //       //   type: 'success',
      //       //   duration: 2000
      //       // })
      //       // this.$router.go(0)
      //       this.activeName = 'login'
      //     })
      //   } else {
      //     console.log('error submit!!');
      //     return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>