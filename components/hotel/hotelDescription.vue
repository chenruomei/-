<template>
  <div class="hotelDescription">
    <div class="content">
      <!-- 区域 -->
      <div class="area">
        <div class="top">
          <span>区域:</span>
          <p :class=" isShow ? '': 'active'">
            <i class="all">全部</i>
            <span
              class="area_site"
              v-for="item in city.scenics"
              :key="item.id"
              @click="handelSetMap(item.city,item.id)"
            >{{item.name}}</span>
          </p>
        </div>
        <div class="allLength">
          <i class="el-icon-d-arrow-right" :class=" isShow ? 'active':''" @click="getAll"></i>
          <!-- 等{{city.scenics.length}}个区域 -->
        </div>
      </div>
      <!-- 攻略 -->
  
      <!-- 均价 -->
      <div class="price">
        <span>
          均价:
          <i>?</i>
        </span>
        <p>
          <span>
            <span>
              <i class="iconfont iconhuangguan" v-for="(item,i) in 3" :key="i"></i>
              <span>¥342</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span>
              <i class="iconfont iconhuangguan" v-for="(v,index) in 4" :key="index"></i>
              <span>¥496</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span>
              <i class="iconfont iconhuangguan" v-for="(val,i1) in 5" :key="i1"></i>
              <span>¥778</span>
            </span>
          </span>
        </p>
      </div>
    </div>
    <div class="map">
      <!-- <hotelMap v-if="city.id" :cityData="city" /> -->
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: Object,
      default: {
          scenics:[]
      },

    },
    // 酒店详情数据
    hotelDetails: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 定义一个经纬度
      locationMap: "",
      isShow: false
    };
  },
  mounted() {
    // console.log(this.city);
    this.getMap();
  },
  methods: {
    handelSetMap(city, id) {
      this.$router.push(`/hotel?city=${city}&scenic=${id}`);
      this.city.scenics.forEach(v => {
        // console.log(v.id == id);
        if (v.id == id) {
          this.getMap(v.location.longitude, v.location.latitude);
        }
      });
    },
    getMap(longitude, latitude) {
      // console.log(this.hotelDetails);
      let locationMapObj = [];
      this.hotelDetails.forEach(val => {
        locationMapObj.push({ location: val.location, name: val.name });
      });
      //
      window.onLoad = function() {
        var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [118.87603, 31.730244],
          zoom: 12 // 地图缩放的倍数
        });
        //
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=45eb53b7f3d466ebbfea135bf46cd2d2&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },
    getAll() {
      this.isShow = !this.isShow;
    }
  },
  watch: {
    hotelDetails() {
      this.getMap();
    }
  }
};
</script>

<style lang="less" scoped>
.hotelDescription {
  display: flex;
  padding: 0 10px;
  .content {
    flex: 6;
    .area,
    .price {
      display: flex;
      font-size: 15px;
      color: #999;
      padding: 10px 0;
      span {
        width: 50px;
      }
      p {
        flex: 1;
      }
    }
    .strategy{
      display: flex;
      flex-wrap: wrap;
      font-size: 15px;
      color: #999;
      padding: 10px 0;
      span {
        width: 50px;
      }
    //   p {
    //     // flex: 1;
    //   }  
    }
    .area {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        p {
          font-size: 15px;
          .all {
            background: #ccc;
            border-radius: 2px;
          }
          .allLength {
            display: block;
            padding: 4px;
            width: 100px;
            // border: 1px solid #000;
          }
          .area_site {
            padding: 4px 8px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
              color: #78cee9;
            }
          }
        }
      }
      .allLength {
        padding-top: 10px;
        padding-left: 50px;
        > i {
          transform: rotate(90deg);
          color: orange;
        }
        .active {
          transform: rotate(270deg);
        }
      }
      .active {
        max-height: 3em;
        overflow: hidden;
      }
    }
    .price {
      > p {
        span {
          i {
            color: orange;
          }
        }
      }
      > span {
        position: relative;
        > i {
          content: "?";
          position: absolute;
          padding: 0 4px;
          top: -5px;
          right: 0px;
          background: #ccc;
          border-radius: 50%;
        }
      }
    }
  }
  .map {
    flex: 4;
    #container {
      width: 100%;
      height: 260px;
    }
    .location {
      color: #2c8df1;
      font-size: 20px;
    }
  }
}
</style>