<template>
  <div>
    <div class="container el-row is-justify-space-between el-row--flex">
      <div class="main">
        <div class="breadcrumb">
          <div aria-label="Breadcrumb" role="navigation" class="el-breadcrumb">
            <span class="el-breadcrumb__item">
              <span role="link" class="el-breadcrumb__inner is-link">旅游攻略</span>
              <span role="presentation" class="el-breadcrumb__separator">/</span>
            </span>
            <span class="el-breadcrumb__item" aria-current="page">
              <span role="link" class="el-breadcrumb__inner">攻略详情</span>
              <span role="presentation" class="el-breadcrumb__separator">/</span>
            </span>
          </div>
        </div>
        <!-- 渲染 contents -->
        <h1>{{ contents.title }}</h1>
        <div class="post-info">
          <span>攻略：{{contents.city.created_at}}</span>
          <span>阅读：{{contents.watch}}</span>
        </div>
        <div class="post-content" v-html="contents.content"></div>
        <div class="post-ctrl">
          <div class="el-row is-justify-center el-row--flex">
            <div class="ctrl-item">
              <i class="iconfont iconpinglun"></i>
              <p>评论(100)</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </div>
          </div>
        </div>
        <!-- 评论区 -->
        <Comments />
      </div>
      <!-- 相关攻略 -->
      <div class="aside">
        <h4 class="aside-title">相关攻略</h4>
        <div class="recommend-list">
          <a
            :href="`/post/travel-strategy?id=${item.id}`"
            class="recommend-item nuxt-link-active"
            v-for="(item, index) in strategyList"
            :key="index"
          >
            <div class="post-imgText el-row el-row--flex">
              <div class="post-img el-row is-align-middle el-row--flex" v-if="item.images.length!=0">
                <img
                  :src="item.images[0]"
                />
              </div>
              <div class="post-text">
                <div>{{ item.title }}</div>
                <p>{{ moment(item.created_at).format('YYYY-MM-DD hh:mm') }} 阅读 {{ item.watch || 0  }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/post/comments";
import loginVue from "../user/login.vue";
import moment from "moment"
export default {
  mounted() {
    this.$axios({
      url: "posts/"+this.$route.query.id
    }).then(res => {
      const { data } = res;
      this.contents = data;
      // console.log(this.contents);
    });
    this.$axios({
      url: "posts/recommend"
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.strategyList = data;
      console.log(this.strategyList);
    }); 
  },
  data() {
    return {
      moment,
      contents: {
        city: {}
      },
      strategyList: [],
    };
  },
  components: {
    Comments
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.main {
  width: 700px;
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;
  }
  /deep/.post-content {
    line-height: 1.5;
    img {
      margin: 10px 0;
    }
    * {
      max-width: 700px !important;
    }
  }
  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        font-size: 28px;
        color: orange;
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.aside {
  width: 280px;
  .aside-title {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommend-item {
    display: block;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    .post-imgText {
      height: 80px;
      .post-text {
        flex: 1;
        position: relative;
        p {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          color: #999;
        }
      }

      /deep/.post-img {
        width: 100px;
        height: 80px;
        flex-shrink: 0;
        background: #ddd;
        overflow: hidden;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>