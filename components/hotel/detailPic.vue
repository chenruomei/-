<template>
  <!-- 图片 -->
  <div class="photo-view">
    <el-col :span="16" class="main-pic">
      <!-- <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt /> -->
      <img :src="bigPicSrc" />
    </el-col>
    <el-col :span="8" class="list-pics">
      <el-col :span="12" class="list-item" v-for="(item,index) in pics">
        <a href="#">
          <!-- <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt /> -->
          <img :src="item.src" alt @click="setBigPic(item.src)" />
        </a>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  props: ["hotelData"],
  data() {
    return {
      // 小图片地址
      pics: [
        {
          id: 1,
          src: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
        },
        {
          id: 2,
          src: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
        },
        {
          id: 3,
          src: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
        },
        {
          id: 4,
          src: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
        },
        {
          id: 5,
          src: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
        },
        {
          id: 6,
          src: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
        }
      ],
      // 大图的地址
      bigPicSrc: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
    };
  },
  mounted() {
    // console.log(this.hotelData.pics);
  },
  methods: {
    setBigPic(url) {
      console.log(url);
      // 点击小图,将小图路径设置为大图的路径
      this.bigPicSrc = url;
    }
  }
};
</script>

<style lang="less" scoped>
.photo-view {
  display: flex;
  margin: 40px 0;
  .main-pic {
    img {
      width: 640px;
      height: 360px;
      object-fit: cover;
    }
  }
  .list-item {
    display: flex;
    margin-bottom: 10px;
    a {
      img {
        width: 160px;
        object-fit: cover;
      }
    }
  }
}
</style>