<template>
  <!-- 城市标题和定位 -->
  <div class="name-Info">
    <h4>
      {{hotelData.name}}
      <i
        class="iconfont icon-huangguan"
        v-for="(item,index) in hotelData.m_city_id"
      ></i>
    </h4>
    <div>{{hotelData.alias}}</div>
    <div class="location">
      <i class="el-icon-location"></i>
      <span>{{hotelData.address}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelData"],
  mounted() {
    // console.log(this.hotelData);
  }
};
</script>

<style lang="less" scoped>
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
      margin-right: 5px;
    }
  }
}
</style>