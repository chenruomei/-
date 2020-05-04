<template>
  <!-- 评论信息组件 -->
  <div class="comment-row">
    <h4 class="comments-hd">99条真实用户评论</h4>
    <el-row>
      <el-col :span="4">
        <p>总评数: 99</p>
        <p>好评数: 90</p>
        <p>差评数: 9</p>
      </el-col>
      <el-col :span="5">
        <div class="comment-star">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="stamp">推荐</div>
      </el-col>

      <el-col :span="3">环境</el-col>
      <el-col :span="3">产品</el-col>
      <el-col :span="3">服务</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 只读评分
      value: 4.5
    };
  }
};
</script>

<style lang="less" scoped>
// 酒店评论
.comment-row {
  .el-row {
    padding: 20px 0;
    line-height: 1;
    .el-col-4 {
      font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Helvetica Neue, Arial, sans-serif;
      font-size: 16px;
      color: #666;
    }
    .el-col-5 {
      position: relative;
      color: #f90;
      .comment-star {
        /deep/ .el-rate {
          font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
          font-size: 16px;
          transform: scale(1.2);
          word-spacing: 1px;
        }
      }
      .stamp {
        position: absolute;
        top: -20px;
        left: 20px;
        border: 2px solid #fa3;
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        border-radius: 50%;
        opacity: 0.25;
        transform: rotate(-30deg);
        font-size: x-large;
      }
    }
    .el-col-3 {
      color: #f90;
    }
  }
}
</style>