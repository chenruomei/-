<template>
  <div class="main">
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>剩机人</h2>
      <span v-show="false">{{allPrice}}</span>
      <el-form class="member-info" ref="form" :rules="rules" :model="form">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <!-- 重点关注input,忽略select即可 -->
          <el-form-item prop="users">
            <el-form-item label="乘机人类型">
              <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                <el-select slot="prepend" value="1" placeholder="请选择">
                  <el-option label="成人" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
                <el-select slot="prepend" value="1" placeholder="请选择">
                  <el-option label="身份证" value="1" :checked="true"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <!-- 删除用户 -->
            <span class="delete-user" @click="handleDeleteUser(index)">-</span>
          </el-form-item>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

<!--保险  -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in detail.insurances" :key="index">
          <!-- change事件在点击时候触发，重点在事件里面获取到id -->
          <el-checkbox
            :checked="false"
            @change="handleInsurances(item.id)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万` "
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

<!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px" :rules="rules" :model="form" ref="form2">
          <!-- 联系人 -->
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <!-- 手机验证码 -->
          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // rule代表规则
    // value是prop绑定的属性的值
    // callback 是一个回调函数，并且是必须要调用的，如果要报错可以传入一个错误对象
    const validatorUser = (rule, value, callback) => {
      // 假设验证是通过的， 如果最后的验证通过就调用callback
      let valid = true;

      // v是一个对象,比如{username: "a", id: "123"}
      value.forEach(v => {
        // 如果验证有一个不通过，后面的判断就没必要再执行
        if (valid === false) return;

        // 如果username是空的
        if (v.username.trim() === "") {
          valid = false;
          return callback(new Error("乘机人姓名不能为空"));
        }

        // 如果id是空的
        if (v.id.trim() === "") {
          valid = false;
          return callback(new Error("乘机人证件号码不能为空"));
        }
      });

      // 如果验证全部通过
      if (valid) {
        callback();
      }
    };
    return {
      //form表单的参数
      form: {
        users: [{ username: "", id: "" }], // 乘机人
        insurances: [], // 选中的保险id
        contactName: "", // 联系人名字
        contactPhone: "", // 联系人电话
        captcha: "", // 验证码这个参数接口文档漏掉了

        invoice: false, // 默认不需要发票
        seat_xid: "", // 座位id
        air: "" // 航班id
      },
      // 机票的详细信息
      detail: {},
      // 验证表单的规则对象
      rules: {
        users: [
          // 自定义验证，validatorUser是个函数，在data里面有定义
          { validator: validatorUser, trigger: "blur" }
        ],
        contactName: [{ required: true, message: "联系人不能为空" }],
        contactPhone: [{ required: true, message: "联系人电话不能为空" }],
        captcha: [{ required: true, message: "验证码不能为空" }]
      }
    };
  },
  //
  mounted() {
    //获取机票的详情信息
    //从url中获取次订单的id和座位号id
    const { id, seat_xid } = this.$route.query;
    //把航班id和座位赋值给表单
    this.form.air = id;
    this.form.seat_xid = seat_xid;
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      this.detail = res.data; //存储本次航班的信息
      // 把详细信息保存到store
      this.$store.commit("air/setFlightData", this.detail);
      // console.log("his.detail", this.detail);
    });
  },
  computed: {
    //要在页面上引用才能实现
    allPrice() {
      // 如果请求还没回来，直接返回为0
      if (!this.detail.seat_infos) {
        return 0;
      }
      let price = 0;
      // 首先先加上单价和燃油费
      price += this.detail.seat_infos.org_settle_price;
      price += this.detail.airport_tax_audlet;

      //表单的参数的保险id和机票的详细信息中的保险id相同的时候
      //表单的参数的保险id和机票的详细信息中的保险id相同的时候
      // 循环选中的保险id获取保险的价格
      this.form.insurances.forEach(v => {
        // 循环后台返回的保险列表
        this.detail.insurances.forEach(item => {
          // 说明当前的保险是我选中的
          if (v == item.id) {
            // 把当前保险的价格加到总价
            price += item.price;
          }
        });
      });
      // 根据人数价格翻倍
      price *= this.form.users.length;
      this.$store.commit("air/setAllPrice", price);
      return price;
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      //往users数组中添加一位乘客
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    //点击保险handleInsurances
    handleInsurances(id) {
      // 判断数组中是否已经包含了该id
      // 如果index大于-1就表示有id，反之就没有
      const index = this.form.insurances.indexOf(id);
      if (index > -1) {
        // 有该id就删除
        this.form.insurances.splice(index, 1);
      } else {
        // 还没有该id
        this.form.insurances.push(id);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //如果是这个手机号
      if (this.form.contactPhone) {
        // 调用user里面actions的方法来发送手机验证码
        this.$store
          .dispatch("user/SendCaptcha", this.form.contactPhone)
          .then(code => {
            this.$message.success("验证码发送成功，模拟的验证码是:" + code);
          });
      } else {
        // 主动触发手机号码的验证
        this.$refs.form2.validateField("contactPhone");
      }
    },

    // 提交订单
    handleSubmit() {
      // 验证表单
      this.$refs.form.validate(valid => {
        // 第二个表单
        this.$refs.form2.validate(valid2 => {
          if (valid && valid2) {
            // 创建订单
            this.$axios({
              url: "/airorders",
              method: "POST",
              headers: {
                // 这里千万要注意Bearer 后面必须要有一个空格（基于JWT标准）
                Authorization: `Bearer ` + this.$store.state.user.userInfo.token
              },
              data: this.form
            }).then(res => {
              this.$message.success("订单提交成功");
              //支付成功候跳转到支付页,带订单id过去
              const { id } = res.data.data;
              this.$router.push({
                path: "/air/pay/",
                query: { id }
              });
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: black;
  width: 20px;
  height: 5px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: black;
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>