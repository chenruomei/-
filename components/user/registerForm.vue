<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码"  v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //确认密码输入框失去焦点的时候触发的验证函数
    //rule:前期的规则(可以忽略)
    //value当前的值
    //callback必须要调用的，
     var validatePass= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 表单数据
      form: {
        username:'',
        nickname:'',
        captcha:'',
        password:'',
        checkPassword:''
      },
      // 表单规则
      rules: {
         username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
         checkPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
      },//rules
    };
  },//data
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //如果手机号码为空难就直接返回
      if(this.form.username===""){
        //主动触发用户名验证
        this.$refs.form.validateField("username");
        return;
      };
    //   this.$axios({
    //     url:'/captchas',
    //     method:"POST",
    //     data:{
    //       tel:this.form.username,
    //     },
    //   }).then(res=>{
    //     console.log("shoujih",res);
    //     const {code}=res.data;
    //     this.$message.success("模拟手机验证成功"+code);

    //   });
      this.$store.dispatch("user/SendCaptcha",this.form.username).then(res=>{
         this.$message.success("模拟手机验证成功"+res);
      });
    },//handleSendCaptcha

    // 注册
    handleRegSubmit() {
      //验证通过之后注册
      this.$refs.form.validate(valid=>{
        if(valid){
          //解构出某个属性，剩余的存在other里面
          const {checkPassword,...other}=this.form;
          //console.log(other);
          //调用注册
           this.$store.dispatch("user/RegSubmit",other);
           this.$message.success("注册成功");
             this.$router.push("/");
         
        }
      })
    }
  }
};
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