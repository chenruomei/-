<template>
  <div class="con">
    <!-- 进度条 -->
    <div class="fliter">
      <!-- 价格 -->
      <div class="price aa">
        <div class="price_top">
          <span>价格</span>
          <span>0-4000</span>
        </div>
        <div class="price_btn">
          <el-slider v-model="rate" :max="4000"></el-slider>
        </div>
      </div>

      <!-- 住宿等级 -->
      <div class="zhusu aa">
        <div class="top">住宿等级</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i>
              <i class="iconfont iconcircle"></i>
              黄金糕
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 住宿类型 -->
      <div class="zhusu aa">
        <div class="top">住宿类型</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i>
              <i class="iconfont iconcircle"></i>
              黄金糕
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 酒店设施 -->
      <div class="zhusu aa">
        <div class="top">酒店设施</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i>
              <i class="iconfont iconcircle"></i>
              黄金糕
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 酒店品牌 -->
      <div class="zhusu aa">
        <div class="top">酒店品牌</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont iconright-1"></i>
              <i class="iconfont iconcircle"></i>
              黄金糕
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- //酒店详情的列表 -->
    <div class="detail">
      <!-- 左边图片 -->
      <nuxt-link to="#">
        <img src="../../static/1.jpg" alt />
      </nuxt-link>

      <!-- 右边文字 -->
      <div class="detail_right">
        <!-- 标题 -->
        <h2>锦江之星(吴泾店)</h2>
        <div class="detail_right_btn">
          <!-- 右边文字的左边 -->
          <div class="detail_right_left">
            <!-- 标题下面的文字 -->
            <p class="biaoxia">
              ru jia kuai jie hotel (fang zhou yuan dian)
              <span id="star">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>经济型</span>
              </span>
            </p>
            <!-- 评价 -->
            <div class="pingjia">
              <!-- 评分 -->
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span class="ping">
                <i>54</i>条评价
              </span>
              <span class="ping">
                <i>62</i>篇游记
              </span>
            </div>
            <!-- 位置 -->
            <div class="weizhi">
              <i class="iconfont iconlocation"></i>
              位于：剑川路165号(近龙吴路)
            </div>
          </div>

          <!-- 右边文字的右边 -->
          <div class="detail_right_right">
            <p>
              <span class="xiecheng">携程</span>
              <span>
                <em>￥193</em>起
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>
            <p>
              <span class="xiecheng">艺龙</span>
              <span>
                <em>￥193</em>起
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>
            <p>
              <span class="xiecheng">Hotels.com</span>
              <span>
                <em>￥193</em>起
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  data() {
    return {
      rate: 3700 //进度条
    };
  } //data
}; ////
=======
data() {
  return {
    rate:3700,//进度条
    value:'',
  }
},//data
};////
>>>>>>> ce5b4fc2599be72684619570c3f23e1d5685b7b4
</script>

<style scoped lang="less">
.con {
  width: 1000px;
  margin: 0 auto;
}

//进度条
.fliter {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  .price {
    .price_top {
      display: flex;
      justify-content: space-between;
    }
  }
  .aa {
    width: 33%;
    padding: 10px;
    border-right: 1px solid #000;
    .el-dropdown {
      width: 100%;
      height: 38px;
      line-height: 38px;
      cursor: pointer;
    }
    .el-dropdown-link {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &:last-child {
      border-right: none;
    }
  }
}

//酒店详情的列表
.detail {
  padding: 15px;
  display: flex;
  //左边图片
  a {
    width: 30%;
    margin-right: 9px;
    img {
      width: 100%;
    }
  }
  //右边文字
  .detail_right {
    .detail_right_btn {
      display: flex;
      position: relative;
    }
    .detail_right_left {
      //标题下面的文字
      .biaoxia {
        color: #999;
        margin: 5px 0;
      }
      //星星
      #star {
        i {
          color: orangered;
        }
      }
      //评价
      .pingjia {
        display: flex;
        .ping {
          margin-left: 24px;
          i {
            color: orangered;
            margin: 0 5px;
          }
        }
      }
    }

    ///上面是右边文字的左边，下面是右边文字的右边
    .detail_right_right {
      position: absolute;
      right: -240px;
      top: 0px;
      p {
        display: flex;
        justify-content: space-between;
        width: 200px;
        padding: 10px;
        border-bottom: 1px solid #000;
        em {
          color: orangered;
          font-size: 17px;
        }
      }
    }
  }
}
</style>