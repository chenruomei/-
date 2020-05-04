<template>
  <div class="container">
    <div class="breadcrumb">
      <!-- 图标分隔符 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
        <el-breadcrumb-item>城市便捷酒店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 城市标题和定位 -->
    <div class="name-Info">
      <h4>
        城市便捷酒店
        <i class="iconfont icon-huangguan"></i>
        <i class="iconfont icon-huangguan"></i>
        <i class="iconfont icon-huangguan"></i>
        <i class="iconfont icon-huangguan"></i>
      </h4>
      <div>cheng shi bian jie jiu dian</div>
      <div class="location">
        <i class="el-icon-location"></i>
        <span>高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
      </div>
    </div>

    <!-- 图片 -->
    <div class="photo-view">
      <el-col :span="16" class="main-pic">
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
      </el-col>
      <el-col :span="8" class="list-pics">
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
        <el-col :span="12" class="list-item">
          <a href="#">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </a>
        </el-col>
      </el-col>
    </div>

    <!-- 酒店价格表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 1000px">
        <el-table-column label="价格来源">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="低价房型">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低价格/每晚">
          <template slot-scope="scope" class="price">
            <span style="color:#f90; font-size:20px
            ;">
              ￥{{ scope.row.LowPrice }}
              <span style="color:#333;font-size:16px;">起</span>
              <i class="el-icon-arrow-right" style="font-size:16px;"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 地图 -->
    <el-row class="map-view">
      <!-- 在页面添加 JS API 的入口脚本标签 -->
      <script
        type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=44efad7f524a368a34f95c1855d6fc33"
      ></script>
      <!-- 左边地图盒子 -->
      <el-col :span="16" id="map-box"></el-col>
      <!-- 右边的风景和交通 -->
      <el-col :span="8" class="map-table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ol>
              <li>
                <span>甘凌路口(公交站)</span>
                <span>0.09公里</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <ol>
              <li>
                <span>甘凌路口(公交站)</span>
                <span>0.09公里</span>
              </li>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 酒店信息 -->
    <div class="info-row">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-col :span="6">入住时间:14:00之后</el-col>
          <el-col :span="6">离店时间:12:00之前</el-col>
          <el-col :span="6">2010年开业/2015年装修</el-col>
          <el-col :span="6">酒店规模:148间客房</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <span>外币兑换服务</span>
          <span>电梯</span>
          <span>洗衣服务</span>
          <span>热水壶</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
    </div>

    <!-- 评论信息 -->
    <div class="comment-row">
      <h4 class="comments-hd">99条真实用户评论</h4>
      <el-row>
        <el-col :span="4">
          <p>总评数: 99</p>
          <p>好评数: 90</p>
          <p>差评数: 9</p>
        </el-col>
        <el-col :span="5">
          <div class="comment-star">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
          <div class="stamp">推荐</div>
        </el-col>

        <el-col :span="3">环境</el-col>
        <el-col :span="3">产品</el-col>
        <el-col :span="3">服务</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 44efad7f524a368a34f95c1855d6fc33 高德地图key
export default {
  data() {
    return {
      // 表格
      tableData: [
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        },
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        },
        {
          source: "携程",
          type: "高级大床房",
          LowPrice: "103"
        }
      ],
      //当前选中项
      activeName: "first",
      // 只读评分
      value: 4.5
    };
  },
  mounted() {
    // 创建地图实例
    let map = new AMap.Map("map-box", {
      zoom: 11, //级别
      center: [116.397428, 39.90923], //中心点坐标
      viewMode: "3D" //使用3D视图
    });
  },
  methods: {
    // 切换table是触发的函数
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
// 引入图标库
@import url("//at.alicdn.com/t/font_1791864_eq23qomqi2.css");
.container {
  width: 1000px;
  margin: 0 auto;
  //   面包屑
  .breadcrumb {
    height: 54px;
    .el-breadcrumb__item {
      line-height: 54px;
    }
  }
  //   酒店信息
  .name-Info {
    h4 {
      height: 32px;
      font-size: 24px;
      font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Helvetica Neue, Arial, sans-serif;
      font-weight: normal;
      color: #333;
      .icon-huangguan {
        color: #f90;
      }
    }
  }
  //   酒店图片
  .photo-view {
    display: flex;
    margin: 40px 0;
    .main-pic {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .list-item {
      display: flex;
      margin-bottom: 10px;
      a {
        img {
          width: 160px;
        }
      }
    }
  }

  // 地图部分
  .map-view {
    margin: 40px 0;
    #map-box {
      width: 650px;
      height: 360px;
      margin-right: 15px;
    }
    .map-table {
      ol {
        color: #666;
        li {
          justify-content: space-between;
          display: flex;
          flex: 1;
          margin: 0 10px 10px 10px;
          cursor: pointer;
        }
      }
    }
  }

  // 酒店信息
  .info-row {
    margin-bottom: 40px;
    .el-row {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
      .el-col-20 {
        color: #666;
        span {
          height: 29px;
          margin-right: 10px;
          padding: 4px 10px;
          background-color: #eee;
        }
      }
    }
  }

  // 酒店评论
  .comment-row {
    .el-row {
      padding: 20px 0;
      line-height: 1;
      .el-col-4 {
        font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
        font-size: 16px;
        color: #666;
      }
      .el-col-5 {
        position: relative;
        color: #f90;
        .comment-star {
          /deep/ .el-rate {
            font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont,
              Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
            font-size: 16px;
            transform: scale(1.2);
            word-spacing: 1px;
          }
        }
        .stamp {
          position: absolute;
          top: -20px;
          left: 20px;
          border: 2px solid #fa3;
          width: 70px;
          height: 70px;
          text-align: center;
          line-height: 70px;
          border-radius: 50%;
          opacity: 0.25;
          transform: rotate(-30deg);
          font-size: x-large;
        }
      }
      .el-col-3 {
        color: #f90;
      }
    }
  }
}
</style>