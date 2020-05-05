<template>
  <div class="rom">
    <div class="left">
      <img src="http://157.122.54.189:9095/uploads/983b4fb3bffe4502a6991704948431c2.jpg" alt />
    </div>
    <div class="right">
      <div class="text">11111111111</div>
      <div class="time">2019-12-10 7:02 阅读 18</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.rom {
  width: 280px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 100px;
      height: 80px;
    }
  }
  .right {
    width: 170px;
    height: 80px;
    display: flex;
    align-content: space-between;
    font-size: 18px;
    flex-direction: column;
    justify-content: space-between;
    .time {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>