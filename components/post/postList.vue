<template>
  <div class="airticle">
    <!-- 第一种结构，底部三张图片 -->
    <div class="type-1" v-if="listContent.images.length>2">
      <nuxt-link :to="`post/detail?id=${listContent.id}`">
        <!-- 标题 -->
        <div class="header">
          <h4>{{listContent.title}}</h4>
          <p class="detail">{{listContent.summary}}</p>
        </div>
        <!-- 图片 -->
        <div class="imgs">
          <el-row type="flex" justify="space-between">
            <el-col :span="8">
              <img :src="listContent.images[0]" alt class="showImgs" />
            </el-col>
            <el-col :span="8">
              <img :src="listContent.images[1]" alt class="showImgs" />
            </el-col>
            <el-col :span="8">
              <img :src="listContent.images[2]" alt class="showImgs" />
            </el-col>
          </el-row>
        </div>
      </nuxt-link>
      <!-- 底部作者，点赞 -->
      <div class="dec">
        <div class="left">
          <span>
            <i data-v-2372b9a8 class="el-icon-location-outline"></i>
            {{listContent.cityName}}
          </span>
          <div class="author">
            by
            <nuxt-link to="user/personal" class="nick-header">
              <img :src="$axios.defaults.baseURL+listContent.account.defaultAvatar" alt />
              {{listContent.account.nickname}}
            </nuxt-link>
          </div>
          <span>
            <i data-v-2372b9a8 class="el-icon-view"></i>
            {{listContent.watch}}
          </span>
        </div>
        <span class="right">{{listContent.like}}赞</span>
      </div>
    </div>
    <!-- 第二种结构，左边一张图片 -->
    <div class="type-2" v-if="listContent.images.length<=2">
      <div class="content">
        <nuxt-link :to="`post/detail?id=${listContent.id}`">
          <!-- 图片 -->
          <div class="left-imgs">
            <a href class="showImgs">
              <img :src="listContent.images[0]" alt />
            </a>
          </div>
        </nuxt-link>
        <!-- 标题 -->
        <div class="right-header">
          <nuxt-link :to="`post/detail?id=${listContent.id}`">
            <div class="up-detail">
              <h4>{{listContent.title}}</h4>
              <p class="detail">{{listContent.summary}}</p>
            </div>
          </nuxt-link>
          <!-- 底部作者，点赞 -->
          <div class="dec">
            <div class="left">
              <span>
                <i data-v-2372b9a8 class="el-icon-location-outline"></i>
                {{listContent.cityName}}
              </span>
              <div class="author">
                by
                <nuxt-link to="user/personal" class="nick-header">
                  <img :src="$axios.defaults.baseURL+listContent.account.defaultAvatar" alt />
                  <span class="nickname">{{listContent.account.nickname}}</span>
                </nuxt-link>
              </div>
              <span>
                <i data-v-2372b9a8 class="el-icon-view"></i>
                {{listContent.watch}}
              </span>
            </div>
            <span class="right">{{listContent.like}}赞</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listContent"]
};
</script>

<style lang="less" scoped>
.airticle {
  // width: 700px;
  margin: 0 auto;
  h4 {
    overflow: hidden; // 超出隐藏
    height: 24px;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 16px;
    &:hover {
      color: orange;
    }
  }
  .detail {
    font-size: 14px;
    overflow: hidden;
    height: 63px;
    line-height: 1.5;
    color: #666;
  }
  .type-1,
  .type-2 {
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 16px;
  }
  .imgs {
    display: flex;
    margin: 16px 0;
    img {
      flex: 1;
      display: block;
      width: 220px;
      height: 150px;
      object-fit: cover;
      &:nth-child(2) {
        margin: 0 20px;
      }
    }
  }
  .type-2 {
    padding-bottom: 16px;
    box-sizing: border-box;
    .content {
      display: flex;
      justify-content: space-between;
      .left-imgs {
        // flex: 1;
        width: 220px;
        height: 150px;
        flex-shrink: 0;
        margin-right: 16px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right-header {
        h4 {
          width: 460px;
          text-overflow: ellipsis; // 超出部分省略号代替
          white-space: nowrap; // 不换行
          word-break: keep-all;
        }
        .up-detail {
          margin-bottom: 16px;
        }
      }
    }
  }
  .dec {
    display: flex;
    font-size: 12px;
    color: #999;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 10px;
      }
      .author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nick-header {
          display: flex;
          margin-right: 10px;
          align-items: center;
          img {
            display: block;
            margin: 5px;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
    .right {
      text-align: right;
      font-size: 18px;
      color: orange;
    }
  }
}
</style>