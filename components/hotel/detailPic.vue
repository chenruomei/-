<template>
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
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
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
</style>