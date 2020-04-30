<template>
  <div class="con">
    <!-- 引入地图 -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=45eb53b7f3d466ebbfea135bf46cd2d2&plugin=AMap.Driving"
    ></script>
    <!-- 多选框 -->
    <div class="choice">
      <div>
        <!-- 输入城市 -->
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="city"
          :fetch-suggestions="querySearchCity"
          placeholder="请输入内容"
          @select="handleSelectCity"
        ></el-autocomplete>
      </div>

      <div>
        <!-- 日期 -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        ></el-date-picker>
      </div>
      <!-- 人数 -->
      <div @click="isShowperson=!isShowperson">
        <el-input placeholder="人数未定" suffix-icon="el-icon-user" readonly="readonly"></el-input>
      </div>
      <!-- 价格 -->
      <div>
        <el-button type="primary">看价格</el-button>
      </div>
      <!-- 下拉框--选中人数 -->
      <div class="xiala" v-if="isShowperson">
        <div class="xiala_top">
          <span>每间</span>
          <el-select class="xuanz" v-model="personNo.adult"  placeholder="请选择">
            <el-option
              v-for="(item,index) in personNo.adultOp"
              :key="index"
              :label="item.label"
              :value="item.value">
            {{ item.value }}
            </el-option>
          </el-select>

          <el-select
            class="xuanz"
            v-model="personNo.children"
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in personNo.childrenOp"
              :key="index"
              :label="item.label"
              :value="item.value">
            {{ item.value }}
            </el-option>
          </el-select>
        </div>

        <el-button class="btn" type="primary">确定</el-button>
      </div>
    </div>

    <!-- 区域 -->
    <div class="quyu">
      <!-- 区域左边 -->
      <div class="quyu_left">
        <!-- 区域左边上面 -->
        <div class="quyu_left_top">
          <span>区域：</span>
          <div class="quyu_left_top_right">
            <div :class="{hiddenAea:isareahidden}">
              <a href="#">区域一</a>
            </div>
            <div class="tubiao" @click="isareahidden=!isareahidden">
              <i class="el-icon-arrow-down" :class="{inp:!isareahidden}"></i>
              等32个区域
            </div>
          </div>
        </div>

        <!-- 区域左边下面 -->
        <div class="quyu_left_btn">
          <span>
            均价
            <sup>?</sup> :
          </span>
          <div class="quyu_left_btn_right">
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
            <div class="dengji">
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <i class="iconfont iconhuangguan" />
              <span>￥332</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 区域右边--地图 -->
      <div class="quyu_right">
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "", //城市
      date: "", //日期
      isareahidden: true, //隐藏显示类,区域显示完整
      isShowperson:false,//选择人数的下拉列表是否显示
      personNo: { //下拉选择人数
        adult: "2 成人",
        adultOp: [
          {
            value: "1",
            label: "1 成人"
          },
          {
            value: "2",
            label: "2 成人"
          },
          {
            value: "3",
            label: "3 成人"
          },
          {
            value: "4",
            label: "4 成人"
          },
          {
            value: "5",
            label: "5 成人"
          },
          {
            value: "6",
            label: "6 成人"
          },
          {
            value: "7",
            label: "7 成人"
          }
        ],
        children: "0 儿童",
        childrenOp: [
          {
            value: "0",
            label: "0 儿童"
          },
          {
            value: "1",
            label: "1 儿童"
          },
          {
            value: "2",
            label: "2 儿童"
          },
          {
            value: "3",
            label: "3 儿童"
          },
          {
            value: "4",
            label: "4 儿童"
          }
        ],
        num: ""
      },

    };
  }, //data
  methods: {
    //远程搜索,城市
    handleSelectCity(item) {
      console.log(item);
    },
    //城市选中
    querySearchCity(value, cb) {}
  }, //methods

  mounted() {
    //地图
    var map = new AMap.Map("container", {
      center: [113.3245904, 23.1066805], //中心点坐标
      zoom: 11
    });
  }
}; ////
</script>

<style scoped lang="less">
.con {
  width: 1000px;
  margin: 0 auto;
}

//条件选中
.choice {
  position: relative;
  display: flex;
  div {
    margin-right: 5px;
  }
}
.xiala {
  position: absolute;
  z-index: 999;
  right: 110px;
  top: 35px;
  width: 300px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px #cccccc;
  margin-top: 5px;
  padding: 5px;

  .xiala_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    span {
      margin-right: 10px;
    }
    .xuanz {
      width: 100px;
    }
  }
  .btn {
    margin-left: 220px;
  }
}
//区域
.quyu {
  display: flex;
  height: 300px;
  margin: 10px 0;
  //左边
  .quyu_left {
    width: 60%;
    //左边上面
    .quyu_left_top {
      display: flex;
      span {
        margin-right: 10px;
      }
      .quyu_left_top_right {
        margin-left: 10px;
        .shou {
          a {
            margin-right: 5px;
            &:hover {
              color: #09f;
              text-decoration: underline;
            }
          }
        }
        .tubiao {
          i {
            color: orangered;
          }
        }
      }
    }
    //左边下面
    .quyu_left_btn {
      display: flex;
      span {
        margin-right: 15px;
        sup {
          width: 15px;
          height: 15px;
          background: #ccc;
          color: #fff;
          display: inline-block;
          border-radius: 100%;
          text-align: center;
        }
      }
      .quyu_left_btn_right {
        display: flex;
        justify-content: space-between;
        .dengji {
          margin-right: 20px;
          i {
            font-size: 12px;
            color: orangered;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
  //右边--地图
  .quyu_right {
    width: 40%;
    #container {
      width: 390px;
      height: 300px;
    }
  }

  //隐藏类
  .hiddenAea {
    height: 41px;
    overflow: hidden;
  }
  //向上收起
  .inp {
    transform: rotate(180deg);
  }
}
</style>