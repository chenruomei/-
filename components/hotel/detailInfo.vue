<template>
  <!-- 酒店信息 -->
  <div class="info-row">
    <el-row>
      <el-col :span="4">基本信息</el-col>
      <el-col :span="20">
        <el-col :span="6">入住时间:14:00之后</el-col>
        <el-col :span="6">离店时间:12:00之前</el-col>
        <el-col :span="6">{{hotelData.creation_time}}/{{hotelData.renovat_time}}</el-col>
        <el-col :span="6">酒店规模:{{hotelData.roomCount}}间客房</el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">主要设施</el-col>
      <el-col :span="20">
        <span
          v-for="(item,index) in hotelData.hotelassets"
          v-if="item.type==='主要设施'||item.type==='房间设施'"
        >{{item.name}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">酒店服务</el-col>
      <el-col :span="20">
        <span v-for="(item,index) in hotelData.hotelassets" v-if="item.type==='酒店服务'">{{item.name}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">品牌信息</el-col>
      <el-col :span="20">
        <span>{{hotelData.hoteltype.name}}</span>
        <span>{{hotelData.hotellevel.name}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["hotelData"]
};
</script>

<style lang="less" scoped>
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
</style>