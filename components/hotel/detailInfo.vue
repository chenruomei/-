<template>
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
</template>

<script>
export default {};
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