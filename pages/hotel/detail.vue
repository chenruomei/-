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
    <DetailHeader :hotelData="hotelData" />
    <!-- 图片 -->
    <DetailPic :hotelData="hotelData" />
    <!-- 酒店价格表格 -->
    <DetailPrice :hotelData="hotelData" />

    <!-- 地图 -->
    <DetailMap :hotelData="hotelData" />

    <!-- 酒店信息 -->
    <DetailInfo :hotelData="hotelData" />
    <!-- 评论信息 -->
    <DetailComment :hotelData="hotelData" />
  </div>
</template>

<script>
import DetailHeader from "@/components/hotel/detailHeader.vue";
import DetailPic from "@/components/hotel/detailPic.vue";
import DetailPrice from "@/components/hotel/detailPrice.vue";
import DetailMap from "@/components/hotel/detailMap.vue";
import DetailInfo from "@/components/hotel/detailInfo.vue";
import DetailComment from "@/components/hotel/detailComment.vue";
// 44efad7f524a368a34f95c1855d6fc33 高德地图key
export default {
  data() {
    return {
      // 酒店详情的数据
      hotelData: []
    };
  },
  components: {
    DetailHeader,
    DetailPic,
    DetailPrice,
    DetailMap,
    DetailInfo,
    DetailComment
  },
  mounted() {
    const { id } = this.$route.query;
    console.log(id);

    // 发起请求
    this.$axios({
      url: `/hotels?id=${id}`
    }).then(res => {
      this.hotelData = res.data.data[0];
      console.log(this.hotelData);
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
}
</style>