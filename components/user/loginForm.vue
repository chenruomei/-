<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "输入错误", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      } //rules
    };
  }, //data
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // //请求登录接口
          // this.$axios({
          //   url:"/accounts/login",
          //   method:"POST",
          //  data:this.form,
          // }).then(res=>{
          //   const {data}=res.data
          //   //错的
          //   // this.$store.state.user.userInfo=data;
          //   //调用store中的mutations方法
          //   this.$store.commit('user/setUserInfo', data);
          // });
          // 调用actions的方法, res就是await后面的promise对象then的返回值
          const res = await this.$store.dispatch("user/login", this.form);
          console.log("登录成功",res);
          
          this.$message.success("登录成功");
          this.$router.push("/");
        }
      });
    } //handleLoginSubmit
  } //methods
}; ///
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
