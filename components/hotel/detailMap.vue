<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前选中项
      activeName: "first"
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