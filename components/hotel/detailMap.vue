<template>
  <div>
    <el-row class="map-view">
      <!-- 在页面添加 JS API 的入口脚本标签 -->
      <!-- <script
        type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=44efad7f524a368a34f95c1855d6fc33"
      ></script>-->
      <!-- 左边地图盒子 -->
      <el-col :span="16" id="map-box"></el-col>
      <!-- 右边的风景和交通 -->
      <el-col :span="8" class="map-table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="风景名胜">
            <ol>
              <li v-for="(item,index) in tourist">
                <span>{{item.name}}</span>
                <span>{{item.distance}}米</span>
              </li>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="交通" name="交通设施服务">
            <ol>
              <li v-for="(item,index) in traffic">
                <span>{{item.name}}</span>
                <span>{{item.distance}}米</span>
              </li>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["hotelData"],
  data() {
    return {
      //tab栏当前选中项
      activeName: "风景名胜",
      // 风景名胜数据
      tourist: [],
      //交通数据
      traffic: [],
      mapDataType: "风景名胜"
    };
  },
  mounted() {
    // 创建地图实例 -- 异步加载
    let _this = this;
    window.onLoad = function() {
      // var map = new AMap.Map("map-box", {
      //   zoom: 11, //级别
      //   center: [118.8718107, 31.32846821] //中心点坐标
      // });
      // // 创建一个 Marker 实例：
      // var marker = new AMap.Marker({
      //   position: new AMap.LngLat(118.8718107, 31.32846821), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //   title: ""
      // });
      // // 将创建的点标记添加到已有的地图实例：
      // map.add(marker);
      const type = _this.mapDataType;
      console.log(type);
      _this.getMapservice(type);
    };
    // 异步导入的链接不用带插件
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=44efad7f524a368a34f95c1855d6fc33&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },

  methods: {
    // 切换table是触发的函数
    handleClick(tab, event) {
      // console.log(tab);
      // console.log(event);
      // console.log(tab.name);
      if (tab.index == 0) {
        // this.mapDataType = tab.name;
        this.mapDataType = "风景名胜";
        this.getMapservice(tab.name);
      }
      if (tab.index == 1) {
        // this.mapDataType = tab.name;
        this.mapDataType = "交通设施服务";
        // console.log(tab.name);

        this.getMapservice(tab.name);
      }
    },

    // 封装创建地图的实例
    getMapservice(mapDataType) {
      var map = new AMap.Map("map-box", {
        zoom: 11, //级别
        center: [118.8718107, 31.32846821] //中心点坐标
      });

      // 范围搜索
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: mapDataType, // 兴趣点类别
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: map // 展现结果的地图实例
          // panel: "panel" // 结果列表将在此容器中进行展示。
        });

        var cpoint = [118.8718107, 31.32846821]; //中心点坐标
        placeSearch.searchNearBy("", cpoint, 10000, (status, result) => {
          // console.log(result);
          if (mapDataType == "风景名胜") {
            this.tourist = result.poiList.pois;
          }
          if (mapDataType == "交通设施服务") {
            this.traffic = result.poiList.pois;
          }

          // console.log(this.tourist);
        });
      });
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(118.8718107, 31.32846821), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "当前地址"
      });
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>