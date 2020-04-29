<template>
  <div style="width: 1000px; margin: 0 auto; padding: 50px 0;">
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=45eb53b7f3d466ebbfea135bf46cd2d2&plugin=AMap.Driving"
    ></script>
    <h2>高德地图</h2>
    <el-row type="flex" align="center" :gutter="80">
      <!-- 下面的 container中千万不要加内容  -->
      <el-col :span="12">
        <div id="container"></div>
      </el-col>
      <el-col :span="12">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
          <el-tab-pane label="驾车" name="first"></el-tab-pane>
          <el-tab-pane label="公交" name="second"></el-tab-pane>
          <el-tab-pane label="步行" name="third"></el-tab-pane>
        </el-tabs>
        <div class="form">
          <el-form>
            <el-form-item>
              <el-input placeholder="起点位置" v-model="start"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="终点位置" v-model="end"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%;" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 显示路线规划的面板， 不要在这个div里面加内容 -->
        <div id="panel"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: "", // 地图对象
      activeName: "first", // 当前驾车还是公交或者步行
      start: "", // 起点位置
      end: "" // 终点位置
    };
  },
  mounted() {
    //1.创建地图实例
    var map = new AMap.Map("container", {
      center: [113.3245904, 23.1066805], //中心点坐标
      zoom: 11
    });
    this.map = map;

    //     // 创建一个 Marker 实例：
    // var marker = new AMap.Marker({
    //     position: new AMap.LngLat(113.3245904, 23.1066805),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //     title: '广州塔'
    // });

    // // 将创建的点标记添加到已有的地图实例：
    // map.add(marker);
  }, //mounted
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    //点击查询按钮
    handleSearch() {
      // 在开始规划路线之前呢，先清除掉地图上的其他内容
      this.map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [113.3245904, 23.1066805] //中心点坐标
      });
      // 清空panel路线规划面板内容
      document.querySelector("#panel").innerHTML = "";
      // 查询驾车路线
      this.handleDriving();
    },
    //路线规划查询
    handleDriving() {
      AMap.plugin("AMap.Driving", () => {
        var driving = new AMap.Driving({
          map: this.map,
          panel: "panel"
        });
        var points = [
          { keyword: this.start, city: "广州" },
          { keyword: this.end, city: "广州" }
        ];
        driving.search(points, (status, result) => {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    }
  } //methods
}; ////
</script>

<style scoped lang="less">
#container {
  width: 500px;
  height: 500px;
}
#panel {
  background-color: white;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>