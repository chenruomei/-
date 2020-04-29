<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" :rules="rules" label-width="80px" :model="form">
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          @blur="handleDepartBlur"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="handleDestBlur"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间" prop="departDate">
        <!-- change 用户确认选择日期时触发 -->
        <!-- value-format指定绑定值的格式 -->
        <!-- 禁用日期通过 disabledDate 设置 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      //表单的数据
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市的字母代码
        destCity: "", //到达城市
        destCode: "",
        departDate: ""
      },
      departCitys: [], //出发城市下拉列表
      destCitys: [], //目的城市下拉列表
      //日期禁用
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
      //表单验证
      rules: {
        departCity: [
          { required: true, message: "请输入出发城市", trigger: "ac" }
        ], //出发城市

        destCity: [
          { required: true, message: "请输入到达城市", trigger: "ac" }
        ], //到达城市

        departDate: [{ required: true, message: "请输入日期", trigger: "ac" }]
      }
    };
  }, //
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    //封装城市请求
    getCities() {},
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) {
        //如果为空则不请求
        cb([]); //禁止输入框的值时空时显示下拉框
        this.departCitys = []; //如果输入值是空，把下拉表之前的列表删除
        return;
      }
      this.$refs.form.validateField("departCity");//对部分表单字段进行校验的方法
      this.$axios({
        url: "airs/city",
        params: {
          name: value
        } //带？的参数
      }).then(res => {
        // console.log("机票",res);
        const { data } = res.data;
        //data的属性没有value,需要转换
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.departCitys = newData;
        cb(newData); //请求成功之后菜调用
      });
    },

    //出发城市失去焦点时选中第一个
    handleDepartBlur() {
      if (this.departCitys.length > 0) {
        this.form.departCity = this.departCitys[0].value;
        this.form.departCode = this.departCitys[0].sort;
      }
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        //如果为空则不请求
        cb([]);
        this.destCitys = [];
        return;
      }
      //监听输入框有值时重新验证表单，消除红色验证
      this.$refs.form.validateField("destCity");
      this.$axios({
        url: "airs/city",
        params: {
          name: value
        } //带？的参数
      }).then(res => {
        // console.log("机票",res);
        const { data } = res.data;
        //data的属性没有value,需要转换
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.destCitys = newData;
        cb(newData); //请求成功之后菜调用
      });
    },

    //目标城市失去焦点时
    handleDestBlur() {
      if (this.destCitys.length > 0) {
        this.form.destCity = this.destCitys[0].value;
        this.form.destCode = this.destCitys[0].sort;
      }
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.$refs.form.validateField("departDate");
      // console.log(value);
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //保存this.form数据到vuex
          this.$store.commit("air/setSearchList",this.form);
          //动态参数使用params
          this.$router.push({
            path: "/air/flights", //路径
            query: this.form ////指定的问号后面的参数
          });
        }
      });
    } // handleSubmit
  }, ///
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>